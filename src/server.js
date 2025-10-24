const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
let items = [];
let nextId = 1;
// CREATE
app.post("/api/items", (req, res) => {
const { name, description } = req.body || {};
if (!name || !description) {
return res.status(400).json({ message: "Missing name or description" });
}
const newItem = { id: nextId++, name, description };
items.push(newItem);
res.status(201).json(newItem);
});
// READ
app.get("/api/items", (req, res) => {
res.json(items);
});
// UPDATE
app.put("/api/items/:id", (req, res) => {
const { id } = req.params;
const { name, description } = req.body || {};
const index = items.findIndex((item) => item.id == id);
if (index === -1) return res.status(404).json({ message: "Item not found" });
if (!name || !description)
return res.status(400).json({ message: "Missing name or description" });
items[index] = { id: parseInt(id), name, description };
res.json(items[index]);

});
// DELETE
app.delete("/api/items/:id", (req, res) => {
const { id } = req.params;
const index = items.findIndex((item) => item.id == id);
if (index === -1) return res.status(404).json({ message: "Item not found" });
const deleted = items.splice(index, 1);
res.json({ message: "Item deleted", deleted: deleted[0] });
});
// Serve the HTML UI
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(PORT, () =>
console.log(`Server running at http://localhost:${PORT}`)
);