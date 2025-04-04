import React, { useEffect, useState } from "react";
import { useItems } from "./hook/use-items";

export const App = () => {
  const { getItems, addItem, deleteItem, updateItem } = useItems();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from backend only once on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const items = await getItems();
        setTodos(items);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array ensures this only runs once on mount

  // Add a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return; // ignore empty strings

    try {
      const newItem = await addItem(newTodo.trim());
      // Update local state with the new item from the backend
      setTodos((prevTodos) => [...prevTodos, newItem]);
      setNewTodo(""); // clear input
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  // Start editing an existing todo
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setEditingText(todo.text || todo.title);
  };

  // Save the edited todo
  const handleSaveEdit = async (id) => {
    try {
      const updatedItem = await updateItem(editingText, id);
      // Update only the modified item in the local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedItem : todo)),
      );
      setEditingTodo(null);
      setEditingText("");
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      // Remove the deleted item from local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Cancel editing without making backend call
  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditingText("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      {/* Form for adding new todos */}
      <form onSubmit={handleAddTodo} className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-gray-300 rounded-l px-2 py-1 w-3/4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-r"
        >
          Add
        </button>
      </form>

      {/* Loading state - only shown during initial load */}
      {isLoading && <p className="text-gray-500">Loading todos...</p>}

      {/* Todo list */}
      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border border-gray-300 p-2 mb-2 rounded flex items-center"
          >
            {editingTodo?.id === todo.id ? (
              // Edit mode
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 mr-2 w-3/4"
                />
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              // Display mode
              <>
                <span className="mr-2 flex-1">{todo.text || todo.title}</span>
                <button
                  onClick={() => handleEditClick(todo)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
