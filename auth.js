const request = require("supertest")("https://dummyjson.com");
const expect = require("chai").expect;
//variable untuk menyimpan token
var token = {};

describe("Scenario Get Authentication", function () {
  it("Verify Failed to Get Current Auth User", async function () {
    const response = await request.get("/auth/me").send();
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access Token is required");
  });

  it("Verify Success to Get Current Auth User - Statis Token", async function () {
    const response = await request
      .get("/auth/me")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzExMjYwNTEsImV4cCI6MTczMTEyOTY1MX0.GHpzk7_OhSbAX-WGZNhJ6g4EXCo3qN7-bRNVa1wp-XU"
      )
      .send();
    expect(response.status).to.equal(200);
  });

  it.only("Verify Success Login", async function () {
    const response = await request
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        username: "emilys",
        password: "emilyspass",
      });
    expect(response.status).to.equal(200);
    token = response.body.accessToken;
    console.log(token);
  });

  it.only("Verify Success to Get Current Auth User - Dinamis Token", async function () {
    const response = await request
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("emilys");
  });
});
