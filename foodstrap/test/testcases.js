var expect = require('chai').expect;
var request = require('request');
var cheerio = require('cheerio');

describe('Automated test Cases', function () {
    describe('SignIn Page Test Cases', function () {
    it('SignIn page', function () {
        request('http://localhost:5000/signin', function (error, response, body) {
           // console.log(body);
           expect(response.statusCode).to.equal(200);
           // console.log(response.statusCode);                
        });
    });
    it('SignIn page content', function () {
        request('http://localhost:5000/signin', function (error, response, body) {
            var $ = cheerio.load(body);
            var submit = $('#submit').attr('name');  
            Promise.resolve(submit)
            .then((submit) => {
                //console.log(submit); 
                expect(submit).to.equal('submit');
            })                    
        });
    });
    })
    describe('SignUp Page Test Cases', function () {
    it('SignUp page', function () {
        request('http://localhost:5000/signup', function (error, response, body) {
           // console.log(body);
           expect(response.statusCode).to.equal(200);
           // console.log(response.statusCode);                
        });
    });
    it('SignUp page content', function () {
        request('http://localhost:5000/signup', function (error, response, body) {
            var $ = cheerio.load(body);
            var submit = $('#submit').attr('name');  
            Promise.resolve(submit)
            .then((submit) => {
                //console.log(submit); 
                expect(submit).to.equal('submit');
            })                    
        });
    });
    })
    describe('Recieve Food- Shelters Page Test Cases', function () {
        it('shelters page', function () {
            request('http://localhost:5000/shelters', function (error, response, body) {
               // console.log(body);
               expect(response.statusCode).to.equal(200);
               // console.log(response.statusCode);                
            });
        });
        it('shelters page content', function () {
            request('http://localhost:5000/shelters', function (error, response, body) {
                var $ = cheerio.load(body);
                var header = $('h1');
                Promise.resolve(header)
                .then((header) => {
                  //  console.log(header); 
                    expect(header).to.not.be.null;
                })                    
            });
        });
        })
    describe('Settings Page Test Cases', function () {
    it('Setting page', function () {
        request('http://localhost:5000/setting', function (error, response, body) {
           // console.log(body);
           expect(response.statusCode).to.equal(200);
           // console.log(response.statusCode);                
        });
    });
    it('Setting page content', function () {
        request('http://localhost:5000/setting', function (error, response, body) {
            var $ = cheerio.load(body);
            var submit = $('#submit').attr('name');  
            Promise.resolve(submit)
            .then((submit) => {
                //console.log(submit); 
                expect(submit).to.equal('submit');
            })                    
        });
    });
})
    describe('Negative flow Test Cases', function () {
    it('Wrong page', function () {
        request('http://localhost:5000/wrongpage', function (error, response, body) {
            //console.log(body);            
           expect(response.statusCode).to.equal(404);               
        });
    });
});
});