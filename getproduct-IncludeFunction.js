//memanggil baseURl menggunakan supertest library
const request = require("supertest")("https://dummyjson.com");
//memanggil expect function dari chai libary
const expect = require("chai").expect;

function generateRandomName() {
  //diisi script function
  const randomString = Math.random().toString(36).substring(2, 10); //3,4,5
  const randomName = "Iphone_" + randomString; //Iphone_asdasdf
  return randomName;
}

describe("Scenario Get Product", function () {
  it("Success Get All Product", async function () {
    //diisi dengan script request
    const response = await request.get("/products").send();
    expect(response.status).to.equal(200);
    console.log(response.status);
  });

  it("Success Add Product - Manual", async function () {
    //diisi dengan script request
    const response = await request
      .post("/products/add")
      .set("Content-Type", "application/json")
      .send({
        title: "Laptop Baru",
      });
    expect(response.status).to.equal(201);
    console.log(response.status);
    console.log(response.body.id);
  });

  it.only("Success Add Product - Random Function", async function () {
    //diisi dengan script request
    this.timeout(5000);
    const response = await request
      .post("/products/add")
      .set("Content-Type", "application/json")
      .send({
        title: generateRandomName(),
      });
    expect(response.status).to.equal(201);
    console.log(response.status);
    console.log(response.body.id);
    console.log(response.body.title);
  });
});
