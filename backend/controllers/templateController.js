const db = require('../models')
const validator = require('validator')
const Template = db.Template
const Site = db.Site
const Category = db.Category
const ListItem = db.ListItem
const TemplateSite = db.TemplateSite

const addTemplate = async (req, res) => {
  const last_updated_by = req.user.user_name
  try {
    const sites = await Site.findAll()

    const template = await Template.create({
      title: 'New Template',
      status: 'draft',
      last_updated_by: validator.trim(validator.escape(last_updated_by)),
      category_id: 1,
      is_environment_related: false,
    })

    // Step 3: Link the new template to all sites
    if (sites.length > 0) {
      const sitePromises = sites.map((site) =>
        TemplateSite.create({
          template_id: template.template_id,
          site_id: site.site_id,
        }),
      )
      await Promise.all(sitePromises)
    }

    if (template) {
      const newTemplate = await Template.findOne({
        where: { template_id: template.template_id },
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
          {
            model: Site,
            through: { model: TemplateSite },
            attributes: ['site_name', 'site_id'],
          },
        ],
      })
      res.status(201).json(newTemplate)
    }
  } catch (err) {
    console.error('Error creating template:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateTemplate = async (req, res) => {
  try {
    const {
      title,
      description,
      category_id,
      sites,
      status,
      is_environment_related,
      access_level,
      is_machine_related,
    } = req.body

    const last_updated_by = req.user.user_name
    let id = req.params.id

    // Sanitize input
    const sanitizedTitle = validator.trim(validator.escape(title))
    const sanitizedDescription = description
      ? validator.trim(validator.escape(description))
      : null
    const sanitizedCategoryId = validator.toInt(category_id.toString())
    const sanitizedLastUpdatedBy = validator.trim(
      validator.escape(last_updated_by),
    )
    const sanitizedStatus = validator.trim(validator.escape(status))
    const sanitizedIsEnvironmentRelated = validator.toBoolean(
      is_environment_related.toString(),
    )
    const sanitizedAccessLevel = validator.toInt(access_level.toString())
    const sanitizedIsMachineRelated = validator.toBoolean(
      is_machine_related.toString(),
    )
    const sanitizedSites = sites
      ? sites.map((site_id) => validator.toInt(site_id.toString()))
      : []

    await Template.update(
      {
        title: sanitizedTitle,
        description: sanitizedDescription,
        category_id: sanitizedCategoryId,
        last_updated_by: sanitizedLastUpdatedBy,
        status: sanitizedStatus,
        is_environment_related: sanitizedIsEnvironmentRelated,
        access_level: sanitizedAccessLevel,
        is_machine_related: sanitizedIsMachineRelated,
      },
      { where: { template_id: id } },
    )

    if (sanitizedSites && Array.isArray(sanitizedSites)) {
      // Destroy existing template sites
      await TemplateSite.destroy({ where: { template_id: id } })

      // Create new template sites in parallel if 'sites' is not empty
      if (sanitizedSites.length > 0) {
        const sitePromises = sanitizedSites.map((site_id) =>
          TemplateSite.create({ template_id: id, site_id: site_id }),
        )
        await Promise.all(sitePromises)
      }
    }

    const updatedTemplate = await Template.findOne({
      where: { template_id: id },
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Site,
          through: { model: TemplateSite },
          attributes: ['site_name', 'site_id'],
        },
      ],
    })
    res.status(200).json(updatedTemplate)
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
      order: [['createdAt', 'DESC']],
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
          attributes: ['site_name', 'site_id'],
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
