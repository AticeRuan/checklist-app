module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define(
    'checklist',
    {
      checklist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checked_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Checklists',
      timestamps: true,
    },
  )

  return Checklist
}
