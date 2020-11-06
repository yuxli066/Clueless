const assert = require("chai").assert;
const http = require("http");
var server;

function serverTest(path) {
  before(function (done) {
    server = require("../bin/www");
    done();
  });
  describe("Testing paths", function () {
    this.timeout(5000);
    it(`Path to ${path} return 200 status code`, function (done) {
      http.get("http://localhost:3001" + path, function (response) {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
  after(function (done) {
    server.close();
    done();
  });
}

serverTest("/");
serverTest("/users");
