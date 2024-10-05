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

const initializeChecklist = async (req, res) => {
  try {
    const currentDate = new Date()
    const { site_id, access_level, username } = req.body

    // 1. Get all templateSites for the site
    const templateSites = await TemplateSite.findAll({
      where: { site_id: site_id },
    })

    let checklists = []

    // 2. For each templateSite, check if there is a checklist for the site and template
    for (const templateSite of templateSites) {
      const template = await Template.findOne({
        where: {
          template_id: templateSite.template_id,
          access_level: access_level,
          status: 'published',
        },
      })

      if (!template) {
        console.warn('No template is found for site:', site_id)
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
          site_id: site_id,
          template_id: template.template_id,
          checked_by: username,
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
          site_id: site_id,
          due_date: dueDate,
          checked_by: username,
        })

        // 4. For each listItemSite, create a new UserCheck
        const listItemsSites = await ListItemSite.findAll({
          where: { site_id: site_id },
        })

        // const listItems = await ListItem.findAll({
        //   where: {
        //     template_id: template.template_id,
        //     updatedAt: {
        //       [Op.gt]: checklist.createdAt,
        //     },
        //     // Include a condition to ensure the list item is available for the specific site
        //     listitem_id: {
        //       [Op.in]: Sequelize.literal(`(
        //         SELECT listitem_id FROM ListItems_Sites WHERE site_id = ${site_id}
        //       )`),
        //     },
        //   },
        // })

        for (const listItemSite of listItemsSites) {
          const listItem = await ListItem.findOne({
            where: {
              listitem_id: listItemSite.listitem_id,
              template_id: template.template_id,
            },
          })

          if (!listItem) {
            console.warn('ListItem not found for Site:', site_id)
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
            attributes: ['title', 'is_environment_related'],
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
    const { username, site_id } = req.body

    if (!site_id) {
      return res.status(400).json({ error: 'Site ID is required' })
    }

    let checklists = await Checklist.findAll({
      where: { site_id: site_id, checked_by: username },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: UserCheck,
          include: [
            {
              model: Action,
              // attributes: ['content', 'createAt']
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
          model: UserCheck,

          include: [
            {
              model: Action,
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

module.exports = {
  initializeChecklist,
  getAllChecklistsByUserAndSite,
  getOneChecklist,
}
