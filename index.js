const express = require("express");

const server = express();
server.use(express.json());

function checkProjectExist(req, res, next) {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return res.status(400).json({ error: "Project not exists" });
  }

  return next();
}

function incrementRequestCount(req, res, next) {
  console.log(++requestCount);

  return next();
}

server.use(incrementRequestCount);

const projects = [];

let requestCount = 0;

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExist, (req, res) => {
  const { id } = req.params;

  projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex > -1) {
    projects.splice(projectIndex, 1);
  }

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  const project = projects[projectIndex];

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
