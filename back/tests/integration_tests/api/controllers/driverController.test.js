const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../../../src/api/server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Driver', () => {
  before(async() => {
    this.app = await server.start();
  }),
  after(() => {
    server.close();
  })
  describe('get', () => {
    it('Should get all drivers', (done) => {
      chai.request(this.app)
        .get('/api/drivers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    })
  })
})