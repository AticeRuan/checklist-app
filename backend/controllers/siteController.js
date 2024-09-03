const db = require('../models')

const Site = db.Site

const addSite = async (req, res) => {
  try {
    const site = await Site.create(req.body)

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
    await Site.update(req.body, { where: { site_id: id } })
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
