function generateRandomName() {
  //diisi script function
  const randomString = Math.random().toString(36).substring(2, 10); //3,4,5
  const randomName = "Iphone_" + randomString; //Iphone_asdasdf
  return randomName;
}
module.exports = generateRandomName;
