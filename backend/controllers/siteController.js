const db = require('../models')
const validator = require('validator')
const Site = db.Site

const addSite = async (req, res) => {
  try {
    // Sanitize input
    const sanitizedBody = {
      site_name: validator.trim(validator.escape(req.body.site_name)),
      region: req.body.region
        ? validator.trim(validator.escape(req.body.region))
        : null,
    }

    const site = await Site.create(sanitizedBody)

    res.status(201).json(site)
  } catch (err) {
    console.error('Error creating site:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getAllSites = async (req, res) => {
  try {
    let sites = await Site.findAll()
    res.status(200).json(sites)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getOneSite = async (req, res) => {
  let id = req.params.id
  try {
    let site = await Site.findOne({ where: { site_id: id } })
    res.status(200).json(site)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateSite = async (req, res) => {
  let id = req.params.id
  try {
    // Sanitize input
    const sanitizedBody = {}
    if (req.body.site_name) {
      sanitizedBody.site_name = validator.trim(
        validator.escape(req.body.site_name),
      )
    }
    if (req.body.region) {
      sanitizedBody.region = validator.trim(validator.escape(req.body.region))
    }

    await Site.update(sanitizedBody, { where: { site_id: id } })
    res.status(200).json('Site updated')
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteSite = async (req, res) => {
  let id = req.params.id
  try {
    await Site.destroy({ where: { site_id: id } })
    res.status(200).json('Site deleted')
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  addSite,
  getAllSites,
  getOneSite,
  updateSite,
  deleteSite,
}
