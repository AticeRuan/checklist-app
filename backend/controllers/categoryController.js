const db = require('../models')
const validator = require('validator')

const Category = db.Category

const addCategory = async (req, res) => {
  try {
    // Sanitize user input
    const sanitizedBody = {
      name: validator.trim(validator.escape(req.body.name)),
      duration: validator.toInt(req.body.duration.toString()), // Convert duration to an integer
    }

    const category = await Category.create(sanitizedBody)

    res.status(201).json(category)
  } catch (err) {
    console.error('Error creating category:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getAllCategory = async (req, res) => {
  try {
    let categories = await Category.findAll()
    res.status(200).send(categories)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getOneCategory = async (req, res) => {
  let id = req.params.id
  try {
    let category = await Category.findOne({ where: { category_id: id } })
    res.status(200).json(category)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateCategory = async (req, res) => {
  let id = req.params.id
  try {
    // Sanitize user input
    const sanitizedBody = {}
    if (req.body.name) {
      sanitizedBody.name = validator.trim(validator.escape(req.body.name))
    }
    if (req.body.duration) {
      sanitizedBody.duration = validator.toInt(req.body.duration.toString())
    }

    const updated = await Category.update(sanitizedBody, {
      where: { category_id: id },
    })

    if (updated) {
      const updatedCategory = await Category.findOne({
        where: { category_id: id },
      })
      res.status(200).json(updatedCategory)
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteCategory = async (req, res) => {
  let id = req.params.id
  try {
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    await category.destroy()
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (err) {
    console.error('Error deleting category:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  addCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
}
