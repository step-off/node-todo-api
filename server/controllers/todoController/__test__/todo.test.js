const {app} = require('../../../app/app');
const request = require('supertest');
const {Todo} = require('../../../models/todos/todo');
const expect = require('expect');
const {ObjectId} = require('../../../db/db');
require('../todoController');

const todos = [{
    _id: new ObjectId(),
    text: 'First test todo item'
}, {
    _id: new ObjectId(),
    text: 'Second test todo item'
}]

describe('Todo controller', () => {
    beforeEach((done) => {
        Todo.remove({})
        .then(() => Todo.insertMany(todos, (e) => false))
        .then(() => done())
        .catch((e) => done(e))
    });

    describe('POST /todos', () => {

        it('should create todo', (done) => {
            const text = 'Test todo text';
    
            request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toEqual(text);
            })
            .end((err, res) => {
                if (err) return done(err);
    
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                })
                .catch((e) => {
                    done(e)
                })
            });
        });

        it('should not create todo with invalid data', (done) => {
        
            request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
    
                Todo.find()
                .then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                })
                .catch((e) => {
                    done(e)
                })
            });
        });    
    });

    describe('GET /todos', () => {
        
        it('should send all todo items on', (done) => {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
        });
    });

    describe('GET /todos/:id', () => {
        it('should send todo item', (done) => {
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text)
            })
            .end(done)
        });

        it('should return 404 for not found id', () => {
            request(app)
            .get(`/todos/${(new ObjectId()).toHexString()}`)
            .expect(404)
        });

        it('should return 404 for non ObjectIds', () => {
            request(app)
            .get(`/todos/123`)
            .expect(404)
        })
    })
})