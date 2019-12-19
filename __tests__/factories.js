const faker = require('faker');
const { factory } = require('factory-girl');
const { User } = require('../src/app/models');

factory.define('User', User, {
    name: factory.sequence('User.name', n => faker.name.findName()),
});

module.exports = factory;