const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/libros");

const Libro = mongoose.model('Libro', new mongoose.Schema({
titulo: String,
autor: String,
editorial: [String],
precio: Number,
cantidad: Number,
}));


const datos = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    editorial: ["Sudamericana"],
    precio: 18500,
    cantidad: 12
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    editorial: ["Sudamericana"],
    precio: 16200,
    cantidad: 8
  },
  {
    titulo: "El túnel",
    autor: "Ernesto Sabato",
    editorial: ["Seix Barral"],
    precio: 9500,
    cantidad: 15
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    editorial: ["Emecé"],
    precio: 14000,
    cantidad: 10
  },
  {
    titulo: "La invención de Morel",
    autor: "Adolfo Bioy Casares",
    editorial: ["Losada"],
    precio: 8700,
    cantidad: 6
  },
  {
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    editorial: ["Alfaguara"],
    precio: 22000,
    cantidad: 5
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    editorial: ["Debolsillo"],
    precio: 12500,
    cantidad: 18
  },
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    editorial: ["Salamandra"],
    precio: 7800,
    cantidad: 20
  },
  {
    titulo: "Crónica de una muerte anunciada",
    autor: "Gabriel García Márquez",
    editorial: ["Debolsillo"],
    precio: 10500,
    cantidad: 9
  },
  {
    titulo: "Los siete locos",
    autor: "Roberto Arlt",
    editorial: ["Losada"],
    precio: 9900,
    cantidad: 7
  }
]



// Crear una ruta que el modelo sea dinamico
// Ver como hacer schema generico clase7 min 23:40

// Ruta para obtener libros
app.get("/libros", async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

app.get("/insertar",async(req,res)=>{
  try {
    console.log('insertado correctamente')
    await Libro.insertMany(datos)
    return res.status(200)
  } catch (error) {
    return res.status(500)
    console.log('error')
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
