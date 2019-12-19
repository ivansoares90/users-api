const routes = require('express').Router();

const UserController = require('./app/controllers/UserController');

routes.get('/users', UserController.getUsers);

routes.get('/users/:id', UserController.getSingleUser);

routes.post('/users', UserController.createUser);

routes.put('/users', UserController.updateUser);

routes.delete('/users', UserController.deleteUser);

module.exports = routes;