const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


// Question 1: Add a "Priority" Field to the To-Do API
// Sample data
let todos = [
  { id: 1, task: "Learn Node.js", completed: false , priority: "high"},
  { id: 2, task: "Build a REST API", completed: false, priority: "medium"},
  { id: 3, task: "Do something", completed: true, priority: "super low"},
  { id: 4, task: "Do something else", completed: false, priority: "medium"},
  { id: 5, task: "Another task", completed: true, priority: "low"}
];

// GET /todos - Retrieve all to-do items
/*
app.get('/todos', (req, res) => {
  res.json(todos);
});
*/

// test if curl works
app.get('/test', (req, res) => {
  res.send('Server is responding');
});

app.get('/todos/complete-all', (req, res) => {
  res.json(todos);
});


/*
Q.3"
GET /todos - Retrieve all to-do items or filter by completed status.
after completing this part, you need to comment out the GET end point
already implemented here to test this new GET endpoint!
*/
app.get('/todos', (req, res) => {
  if (req.query.completed == undefined) {
    res.json(todos);
  } else {
    const completed_status = req.query.completed == "true" ? true : false;

    //filter todos according to completed_status
    const filteredTodos = todos.filter(todo => todo.completed === completed_status);
    res.json(filteredTodos);
  }
});




// POST /todos - Add a new to-do item
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    priority: req.body.priority,
    completed: false
  };
  if (!newTodo.priority) {
    console.log("empty");
    newTodo.priority = "medium";
  }
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


/*
Question 2: Implement a "Complete All" Endpoint
example usage:
curl -X PUT http://localhost:3000/todos/complete-all
*/
app.put('/todos/complete-all', (req, res) => {
  todos.forEach(completeAll);
  res.json(todos);
});

// PUT /todos/:id - Update an existing to-do item
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).send("To-Do item not found");
  }
  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json(todo);
});



// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).send("To-Do item not found");
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function completeAll(todo) {
  todo.completed = true;
}
