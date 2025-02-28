// Updates the label and expanded state of a node
export async function updateNode(nodeId, newLabel, newExpanded) {
  try {
    const response = await fetch(`http://localhost:4000/api/tree/${nodeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: newLabel,
        expanded: newExpanded,
      }),
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      result = text;
    }

    if (response.ok) {
      console.log("Node updated successfully:", result);
    } else {
      console.error("Failed to update node:", result.error || result);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Add a node with the previous node as a parent
export async function addNode(parentId) {
  try {
    const response = await fetch("http://localhost:4000/api/tree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: "label",
        expanded: true,
        parentId: parentId,
      }),
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      result = text;
    }

    if (response.ok) {
      console.log("Node added successfully:", result);
    } else {
      console.error("Failed to add node:", result.error || result);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Removes a node with a given id
export async function removeNode(nodeId) {
  console.log(`Deleting node with ID: ${nodeId} (Type: ${typeof nodeId})`);

  try {
    const response = await fetch(`http://localhost:4000/api/tree/${nodeId}`, {
      method: "DELETE",
    });

    const text = await response.text();
    try {
      const json = JSON.parse(text);
      console.log("Node removed successfully:", json);
    } catch {
      console.log("Server response (not JSON):", text);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
