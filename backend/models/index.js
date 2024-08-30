const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    port: process.env.DB_PORT,
    dialectOptions: {
      encrypt: true,
    },
  },
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to TEMPLATES db has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to TEMPLATES db:', err)
  })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Category = require('./categoryModel')(sequelize, DataTypes)
db.Site = require('./siteModel')(sequelize, DataTypes)
db.Template = require('./templateModel')(sequelize, DataTypes)
db.TemplateSite = require('./templateSiteModel')(sequelize, DataTypes)
db.Comment = require('./commentModel')(sequelize, DataTypes)
db.Checklist = require('./checklistModel')(sequelize, DataTypes)
db.UserCheck = require('./userCheckModel')(sequelize, DataTypes)
db.ListItem = require('./listitemModel')(sequelize, DataTypes)
db.ListItemSite = require('./listitemSiteModel')(sequelize, DataTypes)
db.User = require('./Auth/userModel')(sequelize, DataTypes)

db.BlacklistedToken = require('./Auth/blacklistedTokenModel')(
  sequelize,
  DataTypes,
)

require('./associations')(db)

const syncDatabase = async () => {
  try {
    // await db.sequelize.query('DROP TABLE Users')
    await db.sequelize.sync({ force: false })
    console.log('Drop and re-sync Checklist db.')
  } catch (err) {
    console.error('Error syncing Checklist db:', err)
  }
}

syncDatabase()

module.exports = db
