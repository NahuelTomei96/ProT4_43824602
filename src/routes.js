import { Router } from "express";
import { libros } from "./controller.js";

export const router = Router();

// Ruta para obtener todos los libros
router.get("/libros", libros.getAll);

// Ruta para obtener un libro por su ID
router.get("/libros/:id", libros.getOne);

// Ruta para agregar un nuevo libro
router.post("/libros", libros.add);

// Ruta para eliminar un libro por su ID
router.delete("/libros/:id", libros.delete);

// Ruta para actualizar un libro por su ID
router.put("/libros/:id", libros.update);

// Ruta para eliminar un libro por su ISBN
router.delete("/libros/isbn/:isbn", libros.deleteByISBN);
