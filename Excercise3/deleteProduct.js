// Memanggil baseURL menggunakan supertest library
const request = require("supertest")("https://dummyjson.com");
// Memanggil expect function dari chai library
const expect = require("chai").expect;


describe("Scenario Delete Products", function () {
  // Test case: Update produk dengan ID valid
  it("Success Delete Product", async function () {
    this.timeout(5000); // Timeout untuk test case ini

    // Membuat request PUT untuk update produk
    const response = await request
      .delete("/products/1") // ID valid
      .set("Content-Type", "application/json")
        // Validasi response
    expect(response.status).to.equal(200); // Pastikan status 200
    expect(response.body).to.have.property("isDeleted").that.is.true; // 

      });

  
  it("Failed Delete Product Not exist ID", async function () {
    this.timeout(5000); // Timeout untuk test case ini
    const response = await request
      .put("/products/300") // ID tidak valid
      .set("Content-Type", "application/json")
      console.log(response.body);
    expect(response.status).to.equal(404); 
    expect(response.body).to.have.property("message"); 
    expect(response.body.message).to.equal("Product with id \'300\' not found");
     
  });
});
