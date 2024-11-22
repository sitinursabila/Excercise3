const request = require("supertest")("https://dummyjson.com");
const expect = require("chai").expect;

class auth {
  async login() {
    const response = await request
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        username: "emilys",
        password: "emilyspass",
      });
    expect(response.status).to.equal(200);
    return response;
  }
}
module.exports = auth;
