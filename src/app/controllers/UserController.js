const { User, UserTask } = require('../models');

class UserController {
    async getUsers(req, res) {
        const users = await User.findAll();

        if(users && users.length) {
            return res.status(200).json(users);
        }
        
        return res.status(200).json({ message: "No users"});
    }

    async getSingleUser(req, res) {
        const { id } = req.params;

        User.findOne({
            where: {
                id: id
            }
        }).then(result => {
            if(result !== null ) {
                return res.status(200).json(result);
            }
            
            return res.status(404).json({
                message: 'User not found'
            });
        }).catch(error => {
            return res.status(422).json({
                message: 'Something went wrong!'
            });
        })

        
    }

    async createUser(req, res) {
        const { name } = req.body;

        User.create({
            name: name === '' || name === undefined ? null : name
        })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(error => {
            return res.status(422).json({
                message: 'Something went wrong!'
            });
        })
    }

    async updateUser(req, res) {
        const { id, name } = req.body;

        User.update({
            name: name === '' || name === undefined ? null : name
        }, {
            where: { id: id }
        }).then(result => {
            if(result > 0) {
                return res.status(200).json({
                    message: 'User updated'
                });
            }
            return res.status(404).json({
                message: 'User not found'
            });
        }).catch(error => {
            return res.status(422).json({
                message: 'Something went wrong!'
            });
        })
    }

    async deleteUser(req, res) {
        const { id } = req.body;

        User.destroy({
            where: {
                id: id
            }
        }).then(result => {
            if(result > 0) {
                return res.status(200).json({
                    message: 'User deleted'
                });
            }
            return res.status(404).json({
                message: 'User not found'
            });
        }).catch(error => {
            return res.status(422).json({
                message: 'Something went wrong!'
            });
        })

        
    }
}

module.exports = new UserController();