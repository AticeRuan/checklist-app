module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    'template',
    {
      template_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('published', 'archived', 'draft'),
        allowNull: false,
        defaultValue: 'draft',
      },
      last_updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_environment_related: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      access_level: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    {
      tableName: 'Templates',
      timestamps: true,
    },
  )

  return Template
}
