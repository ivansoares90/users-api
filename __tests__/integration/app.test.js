const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const { User } = require('../../src/app/models');
const factory = require('../factories');

describe("GET /users", () => {
    beforeEach(async () => {
        await truncate();
    });

    it("should receive response.status value as 200", async () => {    
       const response = await request(app)
        .get('/users');

        expect(response.status).toBe(200);
    })

    it("should return a message 'no users' if table is empty", async () => {
        const response = await request(app)
        .get('/users');

        expect(response.body.message).toBe('No users');
    })
    
    it("should return a list of all users if table is not empty", async () => {
        const users = await factory.createMany('User', 2);

        const response = await request(app)
        .get('/users');

        expect(response.body).toMatchObject(JSON.parse(JSON.stringify(users)));
    });
});

describe("POST /users", () => {
    beforeEach(async () => {
        await truncate();
    });

    it("should receive response.status value as 200 if name is valid", async () => {
        const user = await factory.build('User');
        
        response = await request(app)
        .post('/users')
        .send({
            name: user.name
        });

        expect(response.status).toBe(200);
    })

    it("should add user to table and retrieve added user", async () => {
        const user = await factory.build('User');
        
        response = await request(app)
        .post('/users')
        .send({
            name: user.name
        });

        const users = await User.findAll();

        expect(users.length).toBe(1);
        expect(users[0].name).toBe(user.name);
    })

    it("should return the added user as json", async() => {
        const user = await factory.build('User');

        response = await request(app)
        .post('/users')
        .send({
            name: user.name
        });
        
        expect(response.body.name).toBe(user.name);
    })

    it("should return response status 422 if name string is empty", async() => {
        response = await request(app)
        .post('/users')
        .send({
            name: ''
        })

        expect(response.status).toBe(422);
    })

    it("should return response status 422 if name is not passed as parameter", async() => {
        response =  await request(app)
        .post('/users')
        .send();

        expect(response.status).toBe(422);
    })
})

describe("PUT /users", () => {
    it("should create an user, update his/her name and check the updated name", async () => {
        const user = await factory.create('User');

        response = await request(app)
        .put('/users')
        .send({
            id: user.id,
            name: 'updatedName'
        });

        const newUser = await User.findOne({ where: {
            id: user.id
        }})

        expect(newUser.name).toBe('updatedName');
    })

    it("should return response status 422 if name string is empty", async () => {
        const user = await factory.create('User');

        response = await request(app)
        .put('/users')
        .send({
            id: user.id,
            name: ''
        });

        expect(response.status).toBe(422);
    })

    it("should return response status 422 if nothing is passed", async () => {
        const user = await factory.create('User');

        response = await request(app)
        .put('/users')
        .send();

        expect(response.status).toBe(422);
    })

    it("should return response status 404 if user is not found", async () => {
        const user = await factory.create('User');

        response = await request(app)
        .put('/users')
        .send({
            id: -1,
            name: 'test'
        });

        expect(response.status).toBe(404);
    })
})

describe("DELETE /users", () => {
    it("should return response.status 200 if user is deleted", async () => {
        const user = await factory.create('User');

        const response = await request(app)
        .delete('/users')
        .send({
            id: user.id
        })

        expect(response.status).toBe(200);
    })

    it("should delete an user and check if the user was deleted successfully", async () => {
        const user = await factory.create('User');

        const response = await request(app)
        .delete('/users')
        .send({
            id: user.id
        })

        const deletedUser = await User.findOne({
            where: {
                id: user.id
            }
        })

        expect(deletedUser).toBeNull();
    })

    it("should return response.status 404 if user is not found", async () => {
        const response = await request(app)
        .delete('/users')
        .send({
            id: -1
        })

        expect(response.status).toBe(404);
    })

    it("should return response.status 422 if id is empty", async () => {
        const response = await request(app)
        .delete('/users')
        .send();

        expect(response.status).toBe(422);
    })
});

describe("GET /users/:id", () => {
    it("should return 200 if user is found", async () => {
        const user = await factory.create('User');

        const response = await request(app)
        .get('/users/' + user.id)
        .send();

        expect(response.status).toBe(200);
    })

    it("should return 404 if user is not found", async () => {
        const response = await request(app)
        .get('/users/1')
        .send();

        expect(response.status).toBe(404);
    })
})