const User = require("../../middlewares/userMiddleware");
const mongoose = require("mongoose");

describe("Testando middleware de usuario", () => {
  beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/doppelgangers", {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("Deve criar um usuario no banco de dados", async done => {
    const data = {
      username: "Teste Teste",
      email: "llldc21@gmail.com"
    };

    const response = await User.createUser(data);
    expect(response).toEqual(true);

    done();
  });
});
