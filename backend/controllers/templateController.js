const db = require('../models')

const Template = db.Template
const Site = db.Site
const Category = db.Category
const ListItem = db.ListItem
const TemplateSite = db.TemplateSite

const addTemplate = async (req, res) => {
  try {
    const template = await Template.create({
      title: 'New Template',
      status: 'draft',
      last_updated_by: 'Admin',
    })

    res.status(201).json(template)
  } catch (err) {
    console.error('Error creating template:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateTemplate = async (req, res) => {
  try {
    const { title, description, category_id, last_updated_by, sites, status } =
      req.body

    let id = req.params.id
    let seletedsites = sites || []

    await Template.update(
      {
        title: title,
        description: description,
        category_id: category_id,
        last_updated_by: last_updated_by,
        status: status,
      },
      { where: { template_id: id } },
    )

    if (sites && Array.isArray(sites)) {
      // Destroy existing template sites
      await TemplateSite.destroy({ where: { template_id: id } })

      // Create new template sites in parallel if 'sites' is not empty
      if (sites.length > 0) {
        const sitePromises = sites.map((site_id) =>
          TemplateSite.create({ template_id: id, site_id: site_id }),
        )
        await Promise.all(sitePromises)
      }
    }
    res.status(200).json({ message: 'Template updated' })
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteTemplate = async (req, res) => {
  try {
    let id = req.params.id
    const template = await Template.findByPk(id)
    if (!template) {
      return res.status(404).json({ error: 'Template not found' })
    }

    await template.destroy()
    res.status(204).json(template)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getAllTemplates = async (req, res) => {
  try {
    let templates = await Template.findAll({
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    })

    res.status(200).json(templates)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getOneTemplate = async (req, res) => {
  try {
    const id = req.params.id

    const template = await Template.findOne({
      where: { template_id: id },
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Site,
          through: { model: TemplateSite },
          attributes: ['site_name'],
        },
        {
          model: ListItem,
        },
      ],
    })
    res.status(200).json(template)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  addTemplate,
  updateTemplate,
  deleteTemplate,
  getAllTemplates,
  getOneTemplate,
}
