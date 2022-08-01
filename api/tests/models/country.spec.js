const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Country.create({ name: "Argentina" });
      });
    });
  });

  describe("Validaciones de Country", () => {
    it("should not create the Country if id is not send", async () => {
      try {
        await Country.create({
          name: "Texas",
          img: "http://photo.jpg",
          cont: "merica!",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should not create the Country if name is not send", async () => {
      try {
        await Country.create({
          id: "ART",
          img: "http://photo.jpg",
          cont: "merica!",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should not create the Country if img is not send", async () => {
      try {
        await Country.create({
          name: "Texas",
          id: "TXS",
          cont: "merica!",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should not create the Country if cont is not send", async () => {
      try {
        await Country.create({
          name: "Texas",
          img: "http://photo.jpg",
          id: "TXS",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should not create the Country if cap is not send", async () => {
      try {
        await Country.create({
          name: "Texas",
          img: "http://photo.jpg",
          id: "TXS",
          cont: "merica!",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should not create the Country if something is not a string type", async () => {
      try {
        await Country.create({
          name: "Texas",
          img: { fallar: "objeto erroneo" },
          id: "TXS",
          cont: "merica!",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should not create the Country if id is longer than 3 characteres", async () => {
      try {
        await Country.create({
          name: "Texas",
          img: "http://photo.jpg",
          id: "TXSD",
          cont: "merica!",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });

    it("should save all the propetys correctly", async () => {
      const country = await Country.create({
        img: "http://photo.jpg",
        name: "Texas",
        id: "PZD",
        cont: "merica!",
        cap: "some ranch?",
        area: 5,
        pop: 4,
        subreg: "si",
      });
      expect(country.toJSON()).to.deep.equal({
        id: "PZD",
        img: "http://photo.jpg",
        name: "Texas",
        cont: "merica!",
        cap: "some ranch?",
        area: 5,
        pop: 4,
        subreg: "si",
      });
    });

    it("should not create two countys with the same id", async () => {
      try {
        await Country.create({
          name: "Uno",
          img: "http://photo.jpg",
          id: "AAA",
          cont: "merica!",
          cap: "some ranch?",
        });
        await Country.create({
          name: "Dos",
          img: "http://photo.jpg",
          id: "AAA",
          cont: "merica!",
          cap: "some ranch?",
        });
      } catch (error) {
        expect(error).to.have.property("message");
      }
    });
  });
});
