/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  name: "Texas",
  id: "TXS",
  img: "http://photo.jpg",
  cont: "merica!",
  cap: "some ranch?",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    conn.sync({ force: true }).then(() => Country.create(country))
  );

  describe("GET /countries", () => {
    it("should get 200", () => {
      agent.get("/countries").expect(200);
    });
  });

  describe("Testeo de ruta POST /activities", () => {
    describe("POST /activities", () => {
      it("should return status 969 if body is empty", async () => {
        agent.post("/activities").expect(969);
      });

      it("should return activitie object if the activitie was succesfully created", async () => {
        const res = await agent.post("/activities").send({
          name: "Natacion",
          dura: "01-15",
          paisId: "TXS",
          diff: 2,
          temp: "Verano",
        });
        expect(res.body).to.deep.equal({
          name: "Natacion",
          dura: "01-15",
          id: 1,
          diff: 2,
          temp: "Verano",
        });
      });
    });
  });
  after(() => conn.close());
});
