// KanbanBoard.js

import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../Stylesheets/KanbanBoard.css";
import axios from "axios";

var KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo" });

  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = () => {
    axios.post("http://localhost:3001/tasks", newTask)
      .then(response => {
        setTasks([...tasks, newTask]);
        setNewTask({ title: "", description: "", status: "todo" });
      })
      .catch(error => console.error("Error adding task:", error));
  };

  const handleStatusChange = (id, status) => {
    axios.put(`http://localhost:3001/tasks/${id}`, { status })
      .then(() => {
        setTasks(tasks.map(task => (task._id === id ? { ...task, status } : task)));
      })
      .catch(error => console.error("Error updating task:", error));
  };

  return (
    <div className="Main">
      <NavBar />
      <div className="Board">
        <div className="b1">
          <div className="KanbanBoard">
            <div className="kb">Insight Sphere</div>
            <div className="kb">Kanban Board</div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
        <div className="Column">
          <h3>Todo</h3>
          {tasks.filter(task => task.status === "todo").map(task => (
            <div key={task._id} className="Task">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <button onClick={() => handleStatusChange(task._id, "progress")}>Move to Progress</button>
            </div>
          ))}
        </div>
        <div className="Column">
          <h3>Progress</h3>
          {tasks.filter(task => task.status === "progress").map(task => (
            <div key={task._id} className="Task">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <button onClick={() => handleStatusChange(task._id, "completed")}>Move to Completed</button>
            </div>
          ))}
        </div>
        <div className="Column">
          <h3>Completed</h3>
          {tasks.filter(task => task.status === "completed").map(task => (
            <div key={task._id} className="Task">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
