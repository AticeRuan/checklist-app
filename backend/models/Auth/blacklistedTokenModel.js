module.exports = (sequelize, DataTypes) => {
  const BlackListedToken = sequelize.define(
    'blacklisted_token',
    {
      token_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'Blacklisted_Tokens',
      timestamps: false,
    },
  )

  return BlackListedToken
}
