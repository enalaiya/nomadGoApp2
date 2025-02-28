const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL client -> host may need to be 'localhost'
const client = new Client({
  user: "admin",
  host: "host.docker.internal",
  database: "test_db",
  password: "root",
  port: 5432,
});

client.connect();

// Get tree
async function getTree() {
  const treeQuery = `
    WITH RECURSIVE TreePaths AS (
        SELECT id, label, expanded, parent_id, CAST(id AS TEXT) AS path
        FROM tree
        WHERE parent_id IS NULL
        UNION ALL
        SELECT t.id, t.label, t.expanded, t.parent_id, CONCAT(tp.path, '->', t.id)
        FROM tree t
        INNER JOIN TreePaths tp ON t.parent_id = tp.id
    )
    SELECT * FROM TreePaths ORDER BY path;
  `;

  const res = await client.query(treeQuery);
  const flatData = res.rows;

  // builds the tree structure
  function buildTree(nodes, parentId = null) {
    return nodes
      .filter((node) => node.parent_id === parentId)
      .map((node) => ({
        id: node.id,
        label: node.label,
        expanded: node.expanded,
        children: buildTree(nodes, node.id),
      }));
  }

  const tree = buildTree(flatData);
  return tree;
}

// GET /api/tree
// Fetches the tree.
app.get("/api/tree", async (req, res) => {
  try {
    const organizedTree = await getTree();
    res.json(organizedTree);
  } catch (error) {
    console.error("Error fetching tree:", error);
    res.status(500).json({ error: "Failed to fetch tree" });
  }
});

// POST /api/tree
// Creates a new node, with an ID set by incrementing the MAX_ID, and sets the parent node.
app.post("/api/tree", async (req, res) => {
  const { label, expanded, parentId } = req.body;
  await client.query(
    `INSERT INTO tree (id, label, expanded, parent_id)
SELECT COALESCE(MAX(id), 0) + 1, $1, $2, $3
FROM tree;`,
    [label, expanded, parentId]
  );
  res.sendStatus(201);
});

// PUT /api/tree/:id
// Updates a node's label and/or expanded state
app.put("/api/tree/:id", async (req, res) => {
  const { id } = req.params;
  const { label, expanded } = req.body;
  await client.query(
    `UPDATE tree SET label = $2, expanded = $3 WHERE id = $1;`,
    [id, label, expanded]
  );
  res.sendStatus(200);
});

// DELETE /api/tree/:id
// Deletes a node given an id (does not delete if there are children(?))
app.delete("/api/tree/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      "DELETE FROM tree WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Node not found" });
    }

    res.json({ message: "Node deleted successfully", node: result.rows[0] });
  } catch (error) {
    console.error("Error deleting node:", error);
    res.status(500).json({ error: "Failed to delete node" });
  }
});

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
