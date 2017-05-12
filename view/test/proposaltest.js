const chai = require('chai'); // assert, should, expect
var assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();
chai.use(chaiHttp);


//
describe('건물 제안 테스트(/proposal)', function() {

    describe('POST /message, 건물 이름으로 검색한다', function() {
        it('서버에 등록된 건물 이름을 받았다', function(done) {
            chai.request(server)
                .post('/message')
                .send({
                    'user_key': 'DontNeededThisCase',
                    'type': 'text',
                    'content': '공과대학 7호관'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object'); // 프로토타입 검사 (object,array등)
                    res.body.should.have.property('message'); // 프로퍼티 검사
                    res.body.message.should.be.a('object'); // 프로퍼티의 타입 검사
                    res.body.message.should.equal('');
                    done(); //비동기 메시지이므로 콜백 함수 종료시 done()을 호출한다
                });
        });
    });

    describe('POST /message, 잘못된 건물 이름으로 검색한다', function() {
        it('서버에 등록된 건물 이름을 받았다', function(done) {
            chai.request(server)
                .post('/message')
                .send({
                    'user_key': 'DontNeededThisCase',
                    'type': 'text',
                    'content': '공과대학 7호관'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object'); // 프로토타입 검사 (object,array등)
                    res.body.should.have.property('message'); // 프로퍼티 검사
                    res.body.message.should.be.a('object'); // 프로퍼티의 타입 검사
                    res.body.message.should.equal('');
                    done();
                });
        });
    });

}); // 서버 테스트