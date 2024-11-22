//memanggil baseURl menggunakan supertest library
const request = require("supertest")("https://dummyjson.com");
//memanggil expect function dari chai libary
const expect = require("chai").expect;
//memanggil modul lain
const randomProduct = require("./helper/randomName");

var randomProductName = randomProduct();

describe("Scenario Get Product", function () {
  it("Success Get All Product", async function () {
    //diisi dengan script request
    const response = await request.put("/products/1").send();
    expect(response.status).to.equal(200);
    console.log(response.status);
  });

  it("Success Update Product - Manual", async function () {
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
        title: randomProductName, //memanggil function dalam variable
      });
    expect(response.status).to.equal(201);
    expect(response.body.title).to.equal(randomProductName);
    console.log(response.status);
    console.log(response.body.id);
    console.log(response.body.title);
  });
});
