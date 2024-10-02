module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (category) => {
          category.name = category.name.toLowerCase()
        },
        beforeUpdate: (category) => {
          category.name = category.name.toLowerCase()
        },
      },
      tableName: 'Categories',
      timestamps: false, // Move timestamps here, within the same object as hooks and tableName
    },
  )

  return Category
}
