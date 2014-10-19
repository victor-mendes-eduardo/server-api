var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var AppServer = require('../models/appServer')
var config = require('../config/config');

describe('App Server API', function() {
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
	

	describe('Save AppServer', function() {
		it('should appserver be saved successfully', function(done) {

			var appServer = {
				"name": "Application Server #1",
				"status": "RUNNING",
				"ipAddress": "201.21.21.54",
				"tags": ["tag1", "tag2"]
			}

			request(url)
			.post('/api/v1/appServers')
			.send(appServer)
			.expect('Content-Type', /json/)
			.expect('Location', /\/api\//)
			.expect(201) 
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				res.body.message.should.equal('Servidor criado com sucesso');
				res.body.should.have.property('id');
				res.body.status.should.equal(201);
				
				done();
			});
		});

		/*it('should create appServer with associated applications', function(done) {

			var appServer = {
				"name": "Application Server #1",
				"status": "RUNNING",
				"ipAddress": "201.21.21.54",
				"tags": ["tag1", "tag2"],
				"applications": [
					{ "name":"App1", "url": "http;//application1.com" },
					{ "name":"App2", "url": "http;//application2.com" }
				]
			}

			request(url)
			.post('/api/v1/appServers')
			.send(appServer)
			.expect('Content-Type', /json/)
			.expect('Location', /\/api\//)
			.expect(201) 
			.end(function(err, res) {
				request(url).get('/api/v1/appServers/' + res.body.id)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.should.have.property('applications').with.lengthOf(2);
					done();
				});
				
				done();
			});
		});*/

		it('should fail because failed validation', function(done) {
			var appServer = {
				"name": "Application Server #1",
				"status": "RUNNING",
				"ipAddress": "201.21.21.54",
				"tags": ["tag1", "tag2"]
			}

			request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) {

				request(url).post('/api/v1/appServers')
				.send(appServer)
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
			var appServer = { }

			request(url).post('/api/v1/appServers')
			.send(appServer)
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


	describe('Update AppServer', function() {
		it('should update and existing appserver', function(done) {
			var appServer = {
				"name": "Application Server #2",
				"status": "RUNNING",
				"ipAddress": "202.21.21.54",
				"tags": ["tag1", "tag2"]
			}

			request(url).post('/api/v1/appServers')
			.send(appServer)
			.end(function(err, res) {
				request(url).put('/api/v1/appServers/' + res.body.id)
				.send(appServer)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.message.should.equal('Servidor atualizado com sucesso');
					res.body.status.should.equal(200);

					done();
				});
			});
		});		
	});


	describe('List and filter AppServers', function() {
		it('should list the collection of appservers', function(done) {

			for(var i = 0; i < 50; i++){
				var appServer = { "name": "Server #" + i, "status": "RUNNING", "ipAddress": "202.21.21." + i }
				request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/appServers')
				.end(function(err, res) {
					res.body.count.should.equal(50);
					res.body.should.have.property('appServers').with.lengthOf(10);
					done();
				});
			}, 1000);
		});	

		it('should list only the first 2 appserver', function(done) {

			for(var i = 0; i < 50; i++){
				var appServer = { "name": "Server #" + i, "status": "RUNNING", "ipAddress": "202.21.21." + i }
				request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/appServers?max=2')
				.end(function(err, res) {
					res.body.count.should.equal(50);
					res.body.should.have.property('appServers').with.lengthOf(2);
					done();
				});
			}, 1000);
		});

		it('should list appservers filtering by name', function(done) {

			for(var i = 0; i < 50; i++){
				var appServer = { "name": "Server" + i, "status": "RUNNING", "ipAddress": "202.21.21." + i }
				request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/appServers?name=Server1')
				.end(function(err, res) {
					res.body.count.should.equal(1);
					res.body.should.have.property('appServers').with.lengthOf(1);
					done();
				});
			}, 1000);
		});

		it('should list appservers filtering by IP', function(done) {

			for(var i = 0; i < 50; i++){
				var appServer = { "name": "Server #" + i, "status": "RUNNING", "ipAddress": "202.21.21." + i }
				request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/appServers?ipAddress=202.21.21.10')
				.end(function(err, res) {
					res.body.count.should.equal(1);
					res.body.should.have.property('appServers').with.lengthOf(1);
					done();
				});
			}, 1000);
		});

		it('should list appservers filtering by status', function(done) {

			for(var i = 0; i < 50; i++){
				var appServer = { "name": "Server #" + i, "status": "RUNNING", "ipAddress": "202.21.21." + i }
				request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) { });
			}

			setTimeout(function(){
				request(url).get('/api/v1/appServers?status=STOPPED')
				.end(function(err, res) {
					res.body.count.should.equal(0);
					res.body.should.have.property('appServers').with.lengthOf(0);
					done();
				});
			}, 1000);
		});
	});


	describe('Delete AppServer', function() {
		it('should delete a appserver', function(done) {
			var appServer = {
				"name": "Application Server #1",
				"status": "RUNNING",
				"ipAddress": "201.21.21.54",
				"tags": ["tag1", "tag2"]
			}

			request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) {

				request(url).delete('/api/v1/appServers/' + res.body.id)
				.send(appServer)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.status.should.equal(200);
					res.body.message.should.equal("Servidor removido com sucesso");
					
					done();
				});
				
			}); 
		});	
	});	


	describe('Get AppServer', function() {
		it('should get a appserver', function(done) {
			var appServer = {
				"name": "Application Server #1",
				"status": "RUNNING",
				"ipAddress": "201.21.21.54",
				"tags": ["tag1", "tag2"]
			}

			request(url).post('/api/v1/appServers').send(appServer).end(function(err, res) {

				request(url).get('/api/v1/appServers/' + res.body.id)
				.send(appServer)
				.expect('Content-Type', /json/)
				.expect(200) 
				.end(function(err, res) {
					res.body.id.should.equal(res.body.id);
					res.body.name.should.equal("Application Server #1");
					res.body.ipAddress.should.equal("201.21.21.54");
					res.body.status.should.equal("RUNNING");

					done();
				});
			}); 
		});		
	});

});