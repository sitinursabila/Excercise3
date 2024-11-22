// Memanggil baseURL menggunakan supertest library
const request = require("supertest")("https://dummyjson.com");
// Memanggil expect function dari chai library
const expect = require("chai").expect;

function generateRandomName() {
  // Membuat nama acak dengan prefix "Iphone_"
  const randomString = Math.random().toString(36).substring(2, 10); // String acak 8 karakter
  const randomName = "User" + randomString; // Contoh: Iphone_asdasdf
  return randomName;
}

describe("Scenario Update Users", function () {
  // Test case: Update produk dengan ID valid
  it("Success Update Product", async function () {
    this.timeout(5000); // Timeout untuk test case ini

    // Membuat request PUT untuk update produk
    const response = await request
      .put("/users/1") // ID valid
      .set("Content-Type", "application/json")
      .send({
        firstName: generateRandomName(), 
      });

    // Validasi response
    expect(response.status).to.equal(200);
    expect(response.body.firstName).to.exist; 

      });

  
  it("Update users with Invalid ID", async function () {
    this.timeout(5000); // Timeout untuk test case ini

    const response = await request
      .put("/users/209") // ID tidak valid
      .set("Content-Type", "application/json")
      .send({
        firstName: generateRandomName(), 
      });

      console.log(response.body);
    expect(response.status).to.equal(404); 
    expect(response.body).to.have.property("message"); 
    expect(response.body.message).to.equal("User with id '209' not found");
     
  });
});
