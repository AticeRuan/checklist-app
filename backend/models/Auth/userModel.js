module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.role = user.role.toLowerCase()
        },
        beforeUpdate: (user) => {
          user.role = user.role.toLowerCase()
        },
      },
      tableName: 'Users',
      timestamps: false,
    },
  )

  return User
}
