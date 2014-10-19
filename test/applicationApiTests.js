var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var Application = require('../models/application')
var config = require('../config/config');

describe('Application API', function() {
	var url = 'http://victor.mendes:123456@localhost:8080';

	before(function(done) {
		mongoose.connect(config.db.test.url, function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            })    
        })
	});

	afterEach(function(){
		mongoose.connection.db.dropDatabase()    
	});	
	

	describe('Save new Application', function() {
		it('should application be saved successfully', function(done) {

			var application = {
				"name": "Application #1",
				"url": "htt://application1.com",
			}

			request(url)
			.post('/api/v1/applications')
			.send(application)
			.expect('Content-Type', /json/)
			.expect('Location', /\/api\//)
			.expect(201) 
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				res.body.message.should.equal('Aplicação criada com sucesso');
				res.body.should.have.property('id');
				res.body.status.should.equal(201);
				
				done();
			});
		});

		it('should fail because failed validation', function(done) {
			var application = {
				"name": "Application #1",
				"status": "RUNNING",
				"ipAddress": "201.21.21.54",
				"tags": ["tag1", "tag2"]
			}

			request(url).post('/api/v1/applications').send(application).end(function(err, res) {

				request(url).post('/api/v1/applications')
				.send(application)
				.expect('Content-Type', /json/)
				.expect(400) 
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.status.should.equal(400);
					
					done();
				});

			}); 
		});		

		it('should fail because empty post body', function(done) {
			var application = { }

			request(url).post('/api/v1/applications')
			.send(application)
			.expect('Content-Type', /json/)
			.expect(400) 
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				res.body.status.should.equal(400);
				
				done();
			});
		});	
	});	


	describe('Update an Application', function() {
		it('should update and existing application', function(done) {
			var application = {
				"name": "Application #2",
				"url": "http://application.com"
			}

			request(url).post('/api/v1/applications')
			.send(application)
			.end(function(err, res) {
				request(url).put('/api/v1/applications/' + res.body.id)
				.send(application)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.message.should.equal('Aplicação atualizada com sucesso');
					res.body.status.should.equal(200);

					done();
				});
			});
		});		
	});


	describe('List and filter Applications', function() {
		it('should list the collection of applications', function(done) {

			for(var i = 0; i < 50; i++){
				var application = { "name": "App" + i, "url": "http://application.com" + i }
				request(url).post('/api/v1/applications').send(application).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/applications')
				.end(function(err, res) {
					res.body.count.should.equal(50);
					res.body.should.have.property('applications').with.lengthOf(10);
					done();
				});
			}, 1000);
		});	

		it('should list only the first 2 application', function(done) {

			for(var i = 0; i < 50; i++){
				var application = { "name": "App" + i, "url": "http://application.com" + i }
				request(url).post('/api/v1/applications').send(application).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/applications?max=2')
				.end(function(err, res) {
					res.body.count.should.equal(50);
					res.body.should.have.property('applications').with.lengthOf(2);
					done();
				});
			}, 1000);
		});

		it('should list applications filtering by name', function(done) {

			for(var i = 0; i < 50; i++){
				var application = { "name": "App" + i, "url": "http://application.com" + i }
				request(url).post('/api/v1/applications').send(application).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/applications?name=App1')
				.end(function(err, res) {
					res.body.count.should.equal(1);
					res.body.should.have.property('applications').with.lengthOf(1);
					done();
				});
			}, 1000);
		});

		it('should list applications filtering by url', function(done) {

			for(var i = 0; i < 50; i++){
				var application = { "name": "App" + i, "url": "http://application.com" + i }
				request(url).post('/api/v1/applications').send(application).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/applications?url=http://application.com1')
				.end(function(err, res) {
					res.body.count.should.equal(1);
					res.body.should.have.property('applications').with.lengthOf(1);
					done();
				});
			}, 1000);
		});
	});


	describe('Delete Application', function() {
		it('should delete an application', function(done) {
			var application = {
				"name": "Application #1",
				"url": "http://application.com"
			}

			request(url).post('/api/v1/applications').send(application).end(function(err, res) {

				request(url).delete('/api/v1/applications/' + res.body.id)
				.send(application)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.status.should.equal(200);
					res.body.message.should.equal("Aplicação removida com sucesso");
					
					done();
				});
				
			}); 
		});	
	});	


	describe('Get Application', function() {
		it('should get an application', function(done) {
				var application = {
				"name": "Application #1",
				"url": "http://application.com"
			}

			request(url).post('/api/v1/applications').send(application).end(function(err, res) {

				request(url).get('/api/v1/applications/' + res.body.id)
				.send(application)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.id.should.equal(res.body.id);
					res.body.name.should.equal("Application #1");
					res.body.url.should.equal("http://application.com");

					done();
				});
			}); 
		});		
	});
});