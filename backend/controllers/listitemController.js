const { where } = require('sequelize')
const db = require('../models')
const validator = require('validator')

const ListItem = db.ListItem
const ListItemSite = db.ListItemSite
const Site = db.Site

const addListItem = async (req, res) => {
  try {
    const { template_id, is_environment_related, keyword, description, sites } =
      req.body
    const last_updated_by = req.user.user_name

    // Sanitize input
    const sanitizedTemplateId = validator.toInt(template_id.toString())
    const sanitizedIsEnvironmentRelated = validator.toBoolean(
      is_environment_related.toString(),
    )
    const sanitizedKeyword = validator.trim(validator.escape(keyword))
    const sanitizedDescription = validator.trim(validator.escape(description))
    const sanitizedSites = sites.map((site_id) =>
      validator.toInt(site_id.toString()),
    )

    // Create the list item
    const listItem = await ListItem.create({
      template_id: sanitizedTemplateId,
      is_environment_related: sanitizedIsEnvironmentRelated,
      keyword: sanitizedKeyword,
      description: sanitizedDescription,
      last_updated_by: last_updated_by,
    })

    // Ensure that listItem.id is valid and not null
    if (!listItem || !listItem.listitem_id) {
      throw new Error('Failed to create ListItem, ID is null or undefined')
    }

    // Loop through each site and add to ListItemSite
    for (let site_id of sanitizedSites) {
      await ListItemSite.create({
        listitem_id: listItem.listitem_id,
        site_id: site_id,
      })
    }

    // Return the created list item
    res.status(201).json(listItem)
  } catch (err) {
    console.error('Error creating list item:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteListItem = async (req, res) => {
  try {
    let id = req.params.id
    const listItem = await ListItem.findByPk(id)
    if (!listItem) {
      return res.status(404).json({ error: 'List item not found' })
    }

    await listItem.destroy()
    res.status(204).send('List item deleted')
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateListItem = async (req, res) => {
  try {
    let id = req.params.id
    const { template_id, is_environment_related, keyword, description, sites } =
      req.body

    const last_updated_by = req.user.user_name
    const listItem = await ListItem.findByPk(id)

    if (!listItem) {
      return res.status(404).json({ error: 'List item not found' })
    }

    // Sanitize input
    const sanitizedTemplateId = validator.toInt(template_id.toString())
    const sanitizedIsEnvironmentRelated = validator.toBoolean(
      is_environment_related.toString(),
    )
    const sanitizedKeyword = validator.trim(validator.escape(keyword))
    const sanitizedDescription = validator.trim(validator.escape(description))
    const sanitizedSites = sites.map((site_id) =>
      validator.toInt(site_id.toString()),
    )

    await listItem.update({
      template_id: sanitizedTemplateId,
      is_environment_related: sanitizedIsEnvironmentRelated,
      keyword: sanitizedKeyword,
      description: sanitizedDescription,
      last_updated_by: last_updated_by,
    })

    await ListItemSite.destroy({
      where: { listitem_id: id },
    })

    for (let site_id of sanitizedSites) {
      await ListItemSite.create({
        listitem_id: id,
        site_id: site_id,
      })
    }
    res.status(200).json(listItem)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getOneListItem = async (req, res) => {
  let id = req.params.id
  try {
    let listItem = await ListItem.findOne({
      where: { listitem_id: id },
      include: [
        {
          model: Site,
          through: { model: ListItemSite },
          attributes: ['site_name'],
        },
      ],
    })
    res.status(200).json(listItem)
  } catch (err) {
    console.error('Error fetching list item:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getListItemsByTemplateId = async (req, res) => {
  let template_id = req.params.id
  try {
    let listItems = await ListItem.findAll({
      where: { template_id: template_id },
      include: [
        {
          model: Site,
          through: { model: ListItemSite },
          attributes: ['site_name'],
        },
      ],
      order: [['updatedAt', 'DESC']],
    })
    res.status(200).json(listItems)
  } catch (err) {
    console.error('Error fetching list items:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  addListItem,
  deleteListItem,
  updateListItem,
  getOneListItem,
  getListItemsByTemplateId,
}
