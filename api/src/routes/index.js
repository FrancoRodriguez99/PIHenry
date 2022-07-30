const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Country, Tourism } = require("../db.js");
const axios = require("axios");
const router = Router();
const { Op } = require("sequelize");
const sequelize = require("sequelize");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let instancia = true;
//readme pide 2 routas countries, que hacen distintas cosas, imposible tener 2 rutas iguales, comente la otra

router.get("/countries", async function (req, res) {
  const namePais = req.query.name ? req.query.name : false;
  if (namePais) {
    try {
      var fixedname = namePais.toLocaleLowerCase();

      const answer = await Country.findAll({
        where: {
          name: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("name")),
            "LIKE",
            "%" + fixedname + "%"
          ),
        },
      });

      return answer.length > 0
        ? res.status(200).send("Done" + answer)
        : res.status(404).send("No existe ninguno con el nombre: " + namePais);
    } catch (error) {
      return res.status(400).send("Error " + error);
    }
  }
  if (instancia) {
    try {
      const api = await axios.get("https://restcountries.com/v3/all");

      api.data.forEach((element) => {
        const {
          name,
          flags: img,
          population: pop,
          subregion: subreg,
          area: area,
          region: cont,
          cca3: id,
        } = element;

        // "Paises" como la Antartida no tienen capital, entonces su array esta vacio, esto causa problemas al tomar los datos, asi que tuve que dejar un
        //default en caso de ser falso

        const cap = element.capital ? element.capital.join("/-/") : "none";

        Country.create({
          id: id,
          name: name.common,
          img: img[1],
          cont,
          cap,
          subreg,
          area,
          pop,
        });
      });
      instancia = false;
    } catch (error) {
      return res
        .status(400)
        .send("error tomando los datos de la api" + error.stack);
    }
  }
  try {
    const x = await Country.findAll();
    return res.status(200).send(x);
  } catch (error) {
    return res
      .status(400)
      .send("error tomando los datos de la base" + error.stack);
  }
});

router.get("/countries/:idPais", async function (req, res) {
  const idPais = req.params.idPais;
  try {
    const answer = Country.findAll({ where: { id: idPais } });
    return res.status(201).send("Done " + answer);
  } catch (error) {
    return res.status(400).send("Error " + error);
  }
});

/*
router.get("/countries:name", async function (req, res) {
  const namePais = req.query.name;
  try {
    const answer = Country.findAll({ where: { [Op.like]: namePais } });
    return answer
      ? res.status(201).send("Done" + answer)
      : res.status(404).send("No existe ninguno con el nombre: " + name);
  } catch (error) {
    return res.status(400).send("Error " + error);
  }
});
*/
router.post("/activities", async function (req, res) {
  const { name, dura, diff, temp, paisId } = req.body;

  try {
    const answer = await Tourism.create({
      name,
      dura,
      diff,
      temp,
    });
    const link = await Tourism.addTeam(answer.id);
    return res.status(201).send("Done");
  } catch (error) {
    return res.status(400).send("Error " + error);
  }
});

module.exports = router;
