import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      setMessage("Failed to fetch tasks!");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!title || !description || !dueDate) {
      setMessage("All fields are required!");
      return;
    }

    try {
      await axios.post(API_URL, { title, description, dueDate, status: "Open" });
      setTitle("");
      setDescription("");
      setDueDate("");
      setMessage("Task added successfully!");
      fetchTasks();
    } catch (error) {
      setMessage("Error adding task!");
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      setMessage("Task updated successfully!");
      fetchTasks();
    } catch (error) {
      setMessage("Error updating task!");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      setMessage("Error deleting task!");
    }
  };

  return (
    <div className="container">
      <h1>✨ Swetha's Task Manager 🎯 ✅</h1>

      {message && <p className="message">{message}</p>}

      <div className="input-container">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={createTask} className="add-btn">➕ Add Task</button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.length === 0 ? <p>No tasks found!</p> : tasks.map((task) => (
            <li key={task._id} className={task.status === "Completed" ? "completed" : ""}>
              <strong>{task.title}</strong> - {task.status} - Due: {task.dueDate?.slice(0, 10)}
              <div className="task-actions">
                {task.status !== "Completed" && (
                  <button onClick={() => updateTask(task._id, "Completed")} className="complete-btn">✔ Mark Completed</button>
                )}
                <button onClick={() => deleteTask(task._id)} className="delete-btn">🗑 Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
