const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      ra TEXT NOT NULL,
      turma TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

// LISTAR
app.get("/alunos", (req, res) => {
  db.all("SELECT * FROM alunos", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// CADASTRAR
app.post("/alunos", (req, res) => {
  const { nome, ra, turma, email } = req.body;

  db.run(
    "INSERT INTO alunos(nome, ra, turma, email) VALUES (?, ?, ?, ?)",
    [nome, ra, turma, email],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id: this.lastID,
        mensagem: "Aluno cadastrado com sucesso"
      });
    }
  );
});

// EDITAR
app.put("/alunos/:id", (req, res) => {
  const { nome, ra, turma, email } = req.body;

  db.run(
    "UPDATE alunos SET nome=?, ra=?, turma=?, email=? WHERE id=?",
    [nome, ra, turma, email, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        mensagem: "Aluno atualizado"
      });
    }
  );
});

// EXCLUIR
app.delete("/alunos/:id", (req, res) => {
  db.run(
    "DELETE FROM alunos WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        mensagem: "Aluno removido"
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});