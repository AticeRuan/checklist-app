const { Op } = require('sequelize')
const db = require('../models')
const Sequelize = require('sequelize')

const Checklist = db.Checklist
const Template = db.Template
const ListItem = db.ListItem
const ListItemSite = db.ListItemSite
const UserCheck = db.UserCheck
const TemplateSite = db.TemplateSite
const Category = db.Category
const Action = db.Action
const Comment = db.Comment
const validator = require('validator')

const initializeChecklist = async (req, res) => {
  try {
    const currentDate = new Date()
    const { site_id, access_level, username } = req.body

    // Sanitize input
    const sanitizedSiteId = validator.toInt(site_id.toString())
    const sanitizedAccessLevel = validator.toInt(access_level.toString())
    const sanitizedUsername = validator.trim(validator.escape(username))

    // 1. Get all templateSites for the site
    const templateSites = await TemplateSite.findAll({
      where: { site_id: sanitizedSiteId },
    })

    let checklists = []

    // 2. For each templateSite, check if there is a checklist for the site and template
    for (const templateSite of templateSites) {
      const template = await Template.findOne({
        where: {
          template_id: templateSite.template_id,
          access_level: sanitizedAccessLevel,
          status: 'published',
        },
      })

      if (!template) {
        console.warn('No template is found for site:', sanitizedSiteId)
        continue
      }

      const category = await Category.findOne({
        where: { category_id: template.category_id },
      })

      if (!category || !category.duration) {
        console.warn(
          'Category not found or missing duration:',
          template.category_id,
        )
        continue
      }

      // Check if template has any list items updated
      let checklist = await Checklist.findOne({
        where: {
          site_id: sanitizedSiteId,
          template_id: template.template_id,
          checked_by: sanitizedUsername,
          due_date: {
            [Op.gte]: currentDate,
          },
        },
        include: [
          {
            model: Template,
            attributes: ['title'],
            include: [{ model: Category, attributes: ['name'] }],
          },
        ],
      })

      // Check if template has any list items updated after the created date of the checklist
      if (checklist) {
        const listItems = await ListItem.findAll({
          where: {
            template_id: template.template_id,

            updatedAt: {
              [Op.gt]: checklist.createdAt,
            },
          },
        })

        if (listItems.length > 0) {
          for (const listItem of listItems) {
            const userCheck = await UserCheck.findOne({
              where: {
                checklist_id: checklist.checklist_id,
                listitem_id: listItem.listitem_id,
              },
            })

            if (!userCheck) {
              await UserCheck.create({
                checklist_id: checklist.checklist_id,
                listitem_id: listItem.listitem_id,
                is_checked: false,
              })
            } else {
              await UserCheck.update(
                { is_checked: false },
                {
                  where: {
                    checklist_id: checklist.checklist_id,
                    listitem_id: listItem.listitem_id,
                  },
                },
              )
            }
          }
        }
      }

      // 3. If no checklist, create a new checklist with due date = current date + category duration
      if (!checklist) {
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + category.duration)
        dueDate.setHours(0, 0, 0, 0)

        checklist = await Checklist.create({
          template_id: template.template_id,
          site_id: sanitizedSiteId,
          due_date: dueDate,
          checked_by: sanitizedUsername,
        })

        // 4. For each listItemSite, create a new UserCheck
        const listItemsSites = await ListItemSite.findAll({
          where: { site_id: sanitizedSiteId },
        })

        for (const listItemSite of listItemsSites) {
          const listItem = await ListItem.findOne({
            where: {
              listitem_id: listItemSite.listitem_id,
              template_id: template.template_id,
            },
          })

          if (!listItem) {
            console.warn('ListItem not found for Site:', sanitizedSiteId)
            continue
          }

          await UserCheck.create({
            checklist_id: checklist.checklist_id,
            listitem_id: listItem.listitem_id,
            is_checked: false,
          })
        }
      }

      checklist = await Checklist.findOne({
        where: { checklist_id: checklist.checklist_id },
        include: [
          {
            model: Template,
            attributes: [
              'title',
              'is_environment_related',
              'is_machine_related',
            ],
            include: [{ model: Category, attributes: ['name'] }],
          },
          {
            model: UserCheck,
            attributes: ['user_check_id', 'is_checked', 'has_action'],
            include: [
              {
                model: Action,
                attributes: [
                  'action_id',
                  'content',
                  'image_url',
                  'completed',
                  'updatedAt',
                ],
                include: [{ model: Comment }],
              },
              {
                model: ListItem,
                attributes: ['keyword', 'description'],
              },
            ],
          },
        ],
      })

      checklists.push(checklist)
    }

    res.status(200).json(checklists)
  } catch (err) {
    console.error('Error initializing checklist:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

//for history tab
const getAllChecklistsByUserAndSite = async (req, res) => {
  try {
    const { username, site_id } = req.query

    if (!site_id) {
      return res.status(400).json({ error: 'Site ID is required' })
    }

    let checklists = await Checklist.findAll({
      where: { site_id: site_id, checked_by: username },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Template,
          attributes: ['title', 'is_environment_related', 'is_machine_related'],
          include: [{ model: Category, attributes: ['name', 'duration'] }],
        },
        {
          model: UserCheck,
          attributes: ['user_check_id', 'is_checked', 'has_action'],
          include: [
            {
              model: Action,
              attributes: [
                'action_id',
                'content',
                'image_url',
                'completed',
                'updatedAt',
              ],
              include: [{ model: Comment }],
            },
            {
              model: ListItem,
              attributes: ['keyword', 'description'],
            },
          ],
        },
      ],
    })

    res.status(200).send(checklists)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getAllChecklistBySite = async (req, res) => {
  try {
    const { id } = req.params

    // Sanitize input
    const sanitizedSiteId = validator.toInt(id.toString())

    if (!sanitizedSiteId) {
      return res.status(400).json({ error: 'Site ID is required' })
    }

    let checklists = await Checklist.findAll({
      where: { site_id: sanitizedSiteId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Template,
          attributes: ['title', 'is_environment_related', 'is_machine_related'],
          include: [{ model: Category, attributes: ['name'] }],
        },
        {
          model: UserCheck,
          attributes: ['user_check_id', 'is_checked', 'has_action'],
          include: [
            {
              model: Action,
              attributes: [
                'action_id',
                'content',
                'image_url',
                'completed',
                'updatedAt',
              ],
              include: [{ model: Comment }],
            },
            {
              model: ListItem,
              attributes: ['keyword', 'description'],
            },
          ],
        },
      ],
    })

    res.status(200).send(checklists)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getOneChecklist = async (req, res) => {
  try {
    const id = req.params.id

    const checklist = await Checklist.findOne({
      where: { checklist_id: id },
      include: [
        {
          model: Template,
          attributes: ['title', 'is_environment_related', 'is_machine_related'],
        },
        {
          model: UserCheck,
          attributes: ['user_check_id', 'is_checked', 'has_action'],
          include: [
            {
              model: Action,
              attributes: [
                'action_id',
                'content',
                'image_url',
                'completed',
                'updatedAt',
              ],
              include: [{ model: Comment }],
            },
            {
              model: ListItem,
              attributes: ['keyword', 'description'],
            },
          ],
        },
      ],
    })

    if (checklist) {
      res.status(200).json(checklist)
    } else {
      res.status(404).send('Checklist not found')
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateMachineId = async (req, res) => {
  const checklist_id = req.params.id
  const { machine_id } = req.body
  try {
    let checklist = await Checklist.findOne({
      where: { checklist_id: checklist_id },
    })
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist not found' })
    }
    await Checklist.update(
      { machine_id: machine_id },
      { where: { checklist_id: checklist_id } },
    )
    checklist = await Checklist.findOne({
      where: { checklist_id: checklist_id },
      include: [
        {
          model: Template,
          attributes: ['title', 'is_environment_related', 'is_machine_related'],
        },
        {
          model: UserCheck,
          attributes: ['user_check_id', 'is_checked', 'has_action'],
          include: [
            {
              model: Action,
              attributes: [
                'action_id',
                'content',
                'image_url',
                'completed',
                'updatedAt',
              ],
              include: [{ model: Comment }],
            },
            {
              model: ListItem,
              attributes: ['keyword', 'description'],
            },
          ],
        },
      ],
    })
    res.status(200).json(checklist)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  initializeChecklist,
  getAllChecklistsByUserAndSite,
  getAllChecklistBySite,
  getOneChecklist,
  updateMachineId,
}
