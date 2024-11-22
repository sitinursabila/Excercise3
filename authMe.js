const request = require("supertest")("https://dummyjson.com");
const expect = require("chai").expect;
const auth = require("./helper/login");

var token = {};

describe("Scenario Auth Me", function () {
  before("Login", async function () {
    const response = await new auth().login();
    token = response.body.accessToken;
    console.log(token);
  });

  it("Verify Success to Get Current Auth User - Dinamis Token", async function () {
    const response = await request
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("emilys");
  });
});
