const User = require("../../middlewares/userMiddleware");
const app = require("../../index");
const mongoose = require("mongoose");
const request = require("supertest");

let id

describe("Testando middleware de usuario", () => {
  beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/crudDB", {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("Deve criar um usuario no banco de dados", async () => {
    const data = {
      username: "Teste Teste",
      email: "llldc21@gmail.com"
    };

    const response = await User.createUser(data);
    expect(response).toEqual(data);
  });

  it("Deve retornar erro se não conseguir criar", async () => {
    const data = {
      username: null,
      email: null
    };
    const response = await User.createUser(data);
    expect(response).toEqual(false);
  });

  it("O corpo da requisição deve possuir nome e email", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        username: "Lucas Lima",
        email: "llldc21@gmail.com"
      });
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  it("Deve retornar um array com os objetos do usuario", async () => {
    const response = await request(app).get("/list");
    expect(typeof response.body).toBe(typeof []);
  });

  it("Deve retornar status code 200", async () => {
    const response = await request(app).get("/list");
    expect(response.statusCode).toEqual(200);
  });

  it("Deve conter um objeto data", async () => {
    const response = await request(app).get("/list");
    expect(typeof response.body[0]).toBe(typeof {});
  });

  it("O objeto deve conter dados especificos", async () => {
    const response = await request(app).get("/list");

    expect(response.body[0]).toHaveProperty("username");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("updatedAt");
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("__v");
    id = response.body[0]._id
  });

  it("Deve atualizar um registo", async () => {
    const data = {
      username: "Lucas Lima de Castro Fernandes",
      email: "teste@test.com"
    };
    const response = await request(app)
      .put("/update/5dd54099633fe51ac8ac9185")
      .send(data);
    const expectResponse = {
      n: 1,
      nModified: 1,
      ok: 1
    };
    expect(response.body).toStrictEqual(expectResponse);
    expect(response.status).toBe(201);
  });

  it("Deve deletar um registo", async () => {
    const response = await request(app).delete(
      `/delete/${id}`
    );

    const expectResponse = {
      n: 1,
      deletedCount: 1,
      ok: 1
    };
    expect(response.body).toStrictEqual(expectResponse);
    expect(response.status).toBe(201);
  });
});
