module.exports = (sequelize, DataTypes) => {
  const TemplateSite = sequelize.define(
    'template_site',
    {
      template_site_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: 'Template_Sites',
      timestamps: false,
    },
  )

  return TemplateSite
}
