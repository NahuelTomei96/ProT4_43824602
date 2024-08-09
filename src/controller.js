import { pool } from "./database.js";

class libroscontroller {
  async getAll(req, res) {
    try {
      const [result] = await pool.query("SELECT * FROM libros");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los libros" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [
        id,
      ]);

      if (result.length === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }

      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el libro" });
    }
  }

  async add(req, res) {
    try {
      const libros = req.body;
      const [result] = await pool.query(
        "INSERT INTO libros (nombre, autor, categoria, fecha_publicacion, isbn) VALUES (?, ?, ?, ?, ?)",
        [
          libros.nombre,
          libros.autor,
          libros.categoria,
          libros.fecha_publicacion,
          libros.isbn,
        ]
      );
      res.json({ "ID insertado": result.insertId });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar el libro" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const [result] = await pool.query("DELETE FROM libros WHERE id = ?", [
        id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json({ "Registro Eliminado": result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el libro" });
    }
  }

  async deleteByISBN(req, res) {
    try {
      const { isbn } = req.params;
      const [result] = await pool.query("DELETE FROM libros WHERE isbn = ?", [
        isbn,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json({ "Registro Eliminado": result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el libro por ISBN" });
    }
  }

  async update(req, res) {
    try {
      const libros = req.body;
      const [result] = await pool.query(
        "UPDATE libros SET nombre = ?, autor = ?, categoria = ?, fecha_publicacion = ?, isbn = ? WHERE id = ?",
        [
          libros.nombre,
          libros.autor,
          libros.categoria,
          libros.fecha_publicacion,
          libros.isbn,
          libros.id,
        ]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json({ "Registro Actualizado": result.changedRows });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el libro" });
    }
  }
}

export const libros = new libroscontroller();
