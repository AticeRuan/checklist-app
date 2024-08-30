module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define(
    'list_item',
    {
      listitem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      keyword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_environment_related: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_updated_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'ListItems',
      timestamps: true,
    },
  )

  return ListItem
}
