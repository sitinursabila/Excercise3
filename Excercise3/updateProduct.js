// Memanggil baseURL menggunakan supertest library
const request = require("supertest")("https://dummyjson.com");
// Memanggil expect function dari chai library
const expect = require("chai").expect;

function generateRandomName() {
  // Membuat nama acak dengan prefix "Iphone_"
  const randomString = Math.random().toString(36).substring(2, 10); // String acak 8 karakter
  const randomName = "Iphone_" + randomString; // Contoh: Iphone_asdasdf
  return randomName;
}

describe("Scenario Update Product", function () {
  // Test case: Update produk dengan ID valid
  it("Success Update Product", async function () {
    this.timeout(5000); // Timeout untuk test case ini

    // Membuat request PUT untuk update produk
    const response = await request
      .put("/products/1") // ID valid
      .set("Content-Type", "application/json")
      .send({
        title: generateRandomName(), // Mengirim nama produk acak
      });

    // Validasi response
    expect(response.status).to.equal(200); // Memastikan response status = 200
    expect(response.body.title).to.exist; // Memastikan title ada di body
     
  });

  // Test case: Update produk dengan ID tidak valid
  it("Update Product with Invalid ID", async function () {
    this.timeout(5000); // Timeout untuk test case ini

    // Membuat request PUT untuk update produk dengan ID tidak valid
    const response = await request
      .put("/products/999999") // ID tidak valid
      .set("Content-Type", "application/json")
      .send({
        title: generateRandomName(), 
      });

    // Validasi response
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("message"); 
    expect(response.body.message).to.equal("Product with id '999999' not found");
  
  });
});
