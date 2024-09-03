module.exports = (sequelize, DataTypes) => {
  const IPAddress = sequelize.define(
    'ip_address',
    {
      ip_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      site_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: 'IP_Addresses',
      timestamps: false,
    },
  )

  return IPAddress
}
