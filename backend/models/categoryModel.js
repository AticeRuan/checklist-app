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
      tableName: 'Categories',
      timestamps: false,
    },
  )

  return Category
}
