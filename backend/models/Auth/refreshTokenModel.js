module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'refresh_token',
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
        unique: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'refresh_tokens',
      timestamps: true,
    },
  )

  return RefreshToken
}
