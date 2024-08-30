module.exports = (sequelize, DataTypes) => {
  const ListItemSite = sequelize.define(
    'list_item_site',
    {
      listitem_site_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: 'ListItems_Sites',
      timestamps: false,
    },
  )

  return ListItemSite
}
