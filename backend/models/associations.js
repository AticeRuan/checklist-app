module.exports = (db) => {
  // Template Associations
  db.Template.hasMany(db.Checklist, {
    foreignKey: 'template_id',
    onUpdate: 'CASCADE',
  })
  db.Template.hasMany(db.ListItem, {
    foreignKey: 'template_id',
    onUpdate: 'CASCADE',
  })
  db.Template.belongsTo(db.Category, {
    foreignKey: 'category_id',
    onUpdate: 'CASCADE',
  })
  db.Template.belongsToMany(db.Site, {
    through: db.TemplateSite,
    foreignKey: 'template_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  // Checklist Associations
  db.Checklist.belongsTo(db.Template, {
    foreignKey: 'template_id',
    onUpdate: 'CASCADE',
  })
  db.Checklist.belongsTo(db.Site, {
    foreignKey: 'site_id',
    onUpdate: 'CASCADE',
  })
  db.Checklist.hasMany(db.UserCheck, {
    foreignKey: 'checklist_id',
    onUpdate: 'CASCADE',
  })

  // Category Associations
  db.Category.hasMany(db.Template, {
    foreignKey: 'category_id',
    onUpdate: 'CASCADE',
  })

  // Site Associations
  db.Site.hasMany(db.Checklist, {
    foreignKey: 'site_id',
    onUpdate: 'CASCADE',
  })
  db.Site.belongsToMany(db.Template, {
    through: db.TemplateSite,
    foreignKey: 'site_id',
    onUpdate: 'CASCADE',
  })
  db.Site.belongsToMany(db.ListItem, {
    through: db.ListItemSite,
    foreignKey: 'site_id',
    onUpdate: 'CASCADE',
  })

  // ListItem Associations
  db.ListItem.hasMany(db.UserCheck, {
    foreignKey: 'listitem_id',
    onUpdate: 'CASCADE',
  })
  db.ListItem.belongsTo(db.Template, {
    foreignKey: 'template_id',
    onUpdate: 'CASCADE',
  })
  db.ListItem.belongsToMany(db.Site, {
    through: db.ListItemSite,
    foreignKey: 'listitem_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  // UserCheck Associations
  db.UserCheck.belongsTo(db.ListItem, {
    foreignKey: 'listitem_id',
    onUpdate: 'CASCADE',
  })
  db.UserCheck.belongsTo(db.Checklist, {
    foreignKey: 'checklist_id',
    onUpdate: 'CASCADE',
  })
  db.UserCheck.hasMany(db.Comment, {
    foreignKey: 'user_check_id',
    onUpdate: 'CASCADE',
  })

  // Comment Associations
  db.Comment.belongsTo(db.UserCheck, {
    foreignKey: 'user_check_id',
    onUpdate: 'CASCADE',
  })
}
