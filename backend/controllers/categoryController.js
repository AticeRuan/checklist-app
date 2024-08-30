const db = require('../models')

const Category = db.Category

const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    console.log('Category created successfully:', category)
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
    const [updated] = await Category.update(req.body, {
      where: { category_id: id },
    })

    if (updated) {
      const updatedCategory = await Category.findOne({
        where: { category_id: id },
      })
      res.status(200).json(updatedCategory)
    } else {
      res.status(404).send('Category not found')
    }
  } catch (err) {
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
}
