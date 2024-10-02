module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    'site',
    {
      site_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      site_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: (site) => {
          site.site_name = site.site_name.toLowerCase()
          site.region = site.region.toLowerCase()
        },
        beforeUpdate: (site) => {
          site.site_name = site.site_name.toLowerCase()
          site.region = site.region.toLowerCase()
        },
      },
      tableName: 'Sites',
      timestamps: false, // Disable createdAt and updatedAt fields
    },
  )

  return Site
}
