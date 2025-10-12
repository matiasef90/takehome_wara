const User = require('./User')
const Assets = require('./Assets')

Assets.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'owner'
});

User.hasMany(Assets, {
    foreignKey: 'ownerId',
    as: 'assets'
})