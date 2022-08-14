const express = require("express");
const app = express();
const PUERTO = process.env.PORT || 3000;
const { infoCursos } = require("./datos/cursos.js");

// Routers

//app.use("/api/cursos/programacion", routerProgramacion);

const routerMatematicas = require("./routers/matematicas.js");
app.use("/api/cursos/matematicas", routerMatematicas);

// Routing
app.get("/", (req, res) => {
  res.send(`Mi primero servidor con Express. Cursos :D.`);
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});



//Programación

//Matematicas

app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
});
