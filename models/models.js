const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const AppUser = sequelize.define('appUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phoneNumber: {type: DataTypes.STRING, allowNull: true},
});
const WorkerRole = sequelize.define('worker_role',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    rate: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 2,},
})
const Worker = sequelize.define('Worker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    // Роль + пользователь
})
const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.TEXT, allowNull: false},
})
const Stage = sequelize.define('stage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    dateEnd: {type: DataTypes.DATE, defaultValue: Date.now(), allowNull: false},
    dateStart: {type: DataTypes.DATE, defaultValue: Date.now(), allowNull: false},
    dateActualEnd: {type: DataTypes.DATE, defaultValue: Date.now(), allowNull: true},
    finished: {type: DataTypes.INTEGER, defaultValue: null, allowNull: true}
    // Проект
})
const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.TEXT, allowNull: true},
    actDate: {type: DataTypes.DATE, defaultValue: null, allowNull: true},
    dateEnd: {type: DataTypes.DATE, defaultValue: Date.now(), allowNull: false},
    dateStart: {type: DataTypes.DATE, defaultValue: Date.now(), allowNull: false},
    finished: {type: DataTypes.INTEGER, defaultValue: null, allowNull: true}
    // Стадия + Работники
})
const OperReport = sequelize.define('oper_report', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    date: {type: DataTypes.DATE, defaultValue: Date.now(), allowNull: false},
    finished: {type: DataTypes.INTEGER, defaultValue: null, allowNull: true},
    info: {type: DataTypes.TEXT, allowNull: true},
    // Привязан к стадии
})
const ReportData = sequelize.define('report_data', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.TEXT, allowNull: true},
    // Привязан к репорту
})

AppUser.hasMany(Worker)
Worker.belongsTo(AppUser)
Worker.hasMany(WorkerRole)
Project.hasMany(Stage)
Stage.belongsTo(Project)
Stage.belongsTo(OperReport)
OperReport.belongsTo(Stage)
OperReport.hasMany(ReportData)
ReportData.belongsTo(OperReport)
Stage.hasMany(Task)
Task.belongsTo(Stage)
Task.belongsTo(Worker)
Worker.hasMany(Task)

module.exports = {
    AppUser,
    Worker,
    Task,
    Stage,
    Project,
    WorkerRole,
    OperReport,
    ReportData
}
/*
const Author = sequelize.define('author',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const Mark = sequelize.define('mark',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    content: {type: DataTypes.STRING, allowNull: false},
})

const Dialect = sequelize.define('dialect',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Language = sequelize.define('language',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    lang_group: {type: DataTypes.STRING, allowNull: false},
})

const Region = sequelize.define('region',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Publicator = sequelize.define('publicator',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Theme = sequelize.define('theme',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Topic = sequelize.define('topic',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    subject: {type: DataTypes.STRING, allowNull: false},
})

const Publication = sequelize.define('publication',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
    title: {type: DataTypes.STRING, allowNull: false},
    short_review: {type: DataTypes.TEXT, allowNull: false},
    pages: {type: DataTypes.INTEGER, defaultValue: 0},
    date_publ: {type: DataTypes.DATE, defaultValue: Date.now()},
    date_create: {type: DataTypes.DATE, defaultValue: Date.now()},
    file: {type: DataTypes.STRING, allowNull:false}
})

Author.hasMany(Publication)
Publication.belongsTo(Author)

Author.hasMany(Mark)
Mark.belongsTo(Author)

Publication.hasMany(Mark)
Mark.belongsTo(Publication)

Theme.hasMany(Topic)
Topic.belongsTo(Theme)

Theme.hasMany(Publication)
Publication.belongsTo(Theme)

Language.hasMany(Dialect)
Dialect.belongsTo(Language)

Dialect.hasMany(Publication)
Publication.belongsTo(Dialect)

Region.hasMany(Publication)
Publication.belongsTo(Region)

Publicator.hasMany(Publication)
Publication.belongsTo(Publicator)

Type.hasMany(Publication)
Publication.belongsTo(Type)

module.exports = {
    Author,
    Mark,
    Type,
    Publication,
    Publicator,
    Language,
    Dialect,
    Theme,
    Topic,
    Region
}
*/
