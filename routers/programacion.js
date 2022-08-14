const express = require("express");
const { programacion } = require("../datos/cursos.js").infoCursos;
const routerProgramacion = express.Router();

//Middleware
routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(programacion));
});
routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontro cursos de ${lenguaje}.`);
  }

  if (req.query.ordernar === "vistas") {
    return res.send(
      JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas))
    );
  }
  res.send(JSON.stringify(resultados));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontro curso de ${lenguaje} de nivel ${nivel} `);
  }

  res.send(JSON.stringify(resultados));
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put("/:id", (req, res) => {
  const id = req.params.id;
  const cursoActualizado = req.body;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  } else {
    res.send(`No se encontro el id: ${id}`);
  }

  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch("/:id", (req, res) => {
  const infoActulizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    const cursoActualizado = programacion[indice];
    Object.assign(cursoActualizado, infoActulizada); // Permite modificar un objeto y actulizarla
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1); // Elimina el elemento
  } else {
    res.status(404);
  }
  // res.send(JSON.stringify(programacion));
  res.json(programacion);
});

module.exports = routerProgramacion;
