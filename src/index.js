import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;

let tarefas = [];
let idTarefas = 1;

app.post("/tarefas", (req, res) => {
  const { descricao, concluida } = req.body;

  if (!descricao) {
    return res.status(400).json({ message: "Descrição é obrigatória." });
  }

  if (concluida !== "sim" && concluida !== "não") { //concluida é diferente do valor sim?   concluida é diferente do valor não?
    return res
      .status(400)
      .json({ message: "Concluída deve ser 'sim' ou 'não'." });
  }

  const novaTarefa = {
    id: idTarefas++,
    descricao: descricao,
    concluida: concluida,
  };

  tarefas.push(novaTarefa); //Code metrics

  res
    .status(201)
    .json({ message: "Tarefa criada com sucesso!", tarefa: novaTarefa });
});

app.get("/tarefas/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID da tarefa não foi fornecido." });
  }

  const tarefaSelecionada = tarefas.find(
    (tarefa) => tarefa.id === parseInt(id)
  );

console.log(tarefaSelecionada);

  if (!tarefaSelecionada) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }

  res
    .status(200)
    .json({ message: `Tarefa selecionada é: ${tarefaSelecionada.descricao}` });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
