const chai = require('chai'); // assert, should, expect
var assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();
chai.use(chaiHttp);

describe('라우터 테스트', function() {
    describe('GET /', function() {
        it('응답 요청에 성공한다', function(done) {
            chai.request(server)
                .get('/')
                .end(function(err, res) {
                    res.should.have.status(200);
                    done(); //비동기 메시지이므로 콜백 함수 종료시 done()을 호출한다
                });
        });
    });

    describe('POST /message', function() {
        it('kakaotest.js에서 테스트한다', function(done) { done(); });
    });
    describe('POST /smessage', function() {
        it('smstest.js에서 테스트한다', function(done) { done(); });
    });
    describe('GET /proposal', function() {
        it('proposaltest.js에서 테스트한다', function(done) { done(); });
    });

    describe('POST /admin/write', function() {
        it('admintest.js에서 테스트한다', function(done) { done(); });
    });
    describe('POST /admin/view', function() {
        it('admintest.js에서 테스트한다', function(done) { done(); });
    });
    describe('POST /admin/delete', function() {
        it('admintest.js에서 테스트한다', function(done) { done(); });
    });
    describe('POST /admin/viewproposal', function() {
        it('admintest.js에서 테스트한다', function(done) { done(); });
    });

});