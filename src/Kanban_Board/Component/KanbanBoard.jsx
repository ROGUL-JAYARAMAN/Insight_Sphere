import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../Stylesheets/KanbanBoard.css";

const KanbanBoard = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", details: "" });
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo", projectId: null });

  // Load projects from local storage on mount
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects) {
      setProjects(storedProjects);
    }
  }, []);

  const saveProjectsToLocalStorage = (updatedProjects) => {
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleAddProject = () => {
    if (newProject.name === "") {
      alert("Project name is required.");
      return;
    }
    const newProjectWithId = { ...newProject, _id: Date.now().toString() };
    const updatedProjects = [...projects, newProjectWithId];
    setProjects(updatedProjects);
    saveProjectsToLocalStorage(updatedProjects);
    setNewProject({ name: "", details: "" });
  };

  const handleRemoveProject = (projectId) => {
    const updatedProjects = projects.filter(project => project._id !== projectId);
    setProjects(updatedProjects);
    saveProjectsToLocalStorage(updatedProjects);

    if (selectedProject && selectedProject._id === projectId) {
      setSelectedProject(null);
      setTasks([]);
      localStorage.removeItem(`tasks-${projectId}`);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    const storedTasks = JSON.parse(localStorage.getItem(`tasks-${project._id}`)) || [];
    setTasks(storedTasks);
  };

  const handleAddTask = () => {
    if (!selectedProject) return alert("Please select a project first.");
    const newTaskWithId = { ...newTask, _id: Date.now().toString(), projectId: selectedProject._id };
    const updatedTasks = [...tasks, newTaskWithId];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${selectedProject._id}`, JSON.stringify(updatedTasks));
    setNewTask({ title: "", description: "", status: "todo", projectId: null });
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task._id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${selectedProject._id}`, JSON.stringify(updatedTasks));
  };

  const handleStatusChange = (task, newStatus) => {
    const updatedTasks = tasks.map(t =>
      t._id === task._id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${selectedProject._id}`, JSON.stringify(updatedTasks));
  };

  return (
    <div className="Main">
      <NavBar />
      <div className="ProjectForm">
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Project Details"
          value={newProject.details}
          onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
        />
        <button onClick={handleAddProject}>Add Project</button>
      </div>
      <div className="ProjectGrid">
        {projects.map(project => (
          <div
            key={project._id}
            className="ProjectCard"
          >
            <div onClick={() => handleProjectClick(project)}>
              {project.name}
            </div>
            <button className="RemoveButton" onClick={() => handleRemoveProject(project._id)}>Remove Project</button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="TaskModal">
          <div className="TaskColumn">
            <h3>Todo</h3>
            {tasks.filter(task => task.status === "todo").map(task => (
              <div key={task._id} className="Task">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="AddRemoveButtons">
                  <button onClick={() => handleStatusChange(task, "progress")}>Move to Progress</button>
                  <button onClick={() => handleRemoveTask(task._id)}>Remove Task</button>
                </div>
              </div>
            ))}
          </div>
          <div className="TaskColumn">
            <h3>Progress</h3>
            {tasks.filter(task => task.status === "progress").map(task => (
              <div key={task._id} className="Task">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="AddRemoveButtons">
                  <button onClick={() => handleStatusChange(task, "completed")}>Move to Completed</button>
                  <button onClick={() => handleRemoveTask(task._id)}>Remove Task</button>
                </div>
              </div>
            ))}
          </div>
          <div className="TaskColumn">
            <h3>Completed</h3>
            {tasks.filter(task => task.status === "completed").map(task => (
              <div key={task._id} className="Task">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <button onClick={() => handleRemoveTask(task._id)}>Remove Task</button>
              </div>
            ))}
          </div>
          <div className="TaskColumn">
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
      )}
    </div>
  );
};

export default KanbanBoard;
