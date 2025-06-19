# 📝 API de Tarefas

Uma API RESTful simples para gerenciamento de tarefas, desenvolvida em Node.js sem frameworks, com suporte a operações CRUD e importação de tarefas via arquivo CSV.

---

## 🚀 Funcionalidades

* Criar tarefas (`POST /tasks`)
* Listar todas as tarefas (`GET /tasks`)

  * Suporte a filtros via query string (ex: `?search=estudar`)
* Atualizar título e descrição de uma tarefa (`PUT /tasks/:id`)
* Marcar ou desmarcar uma tarefa como concluída (`PATCH /tasks/:id/complete`)
* Remover uma tarefa (`DELETE /tasks/:id`)
* Importar tarefas a partir de um arquivo `.csv`

---

## 📦 Instalação

```bash
git clone https://github.com/RenanTGMF/api-tasks
cd api-tasks
npm install
```

---

## ▶️ Executando a API

```bash
npm run dev
```

A API será iniciada em: `http://localhost:3333`

---

## 📄 Formato de Tarefa

```json
{
  "id": "uuid",
  "title": "Título da tarefa",
  "description": "Descrição opcional",
  "completed_at": null,
  "created_at": "2025-06-18T12:00:00.000Z",
  "updated_at": "2025-06-18T12:00:00.000Z"
}
```

---

## 📂 Estrutura de Pastas

```
src/
├── middlewares/       # Middleware de Json
├── utils/             # Funções utilitárias
├── database.js        # Interface de banco
├── routes.js          # Definição das rotas
└── server.js          # Servidor principal
```