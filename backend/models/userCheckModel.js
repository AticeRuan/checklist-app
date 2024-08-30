module.exports = (sequelize, DataTypes) => {
  const UserCheck = sequelize.define(
    'user_check',
    {
      user_check_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      is_checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'UserChecks',
      timestamps: true,
    },
  )

  return UserCheck
}
