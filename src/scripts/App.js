import {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import {
  BsCalendar,
  BsCalendar3,
  BsGrid,
  BsInbox,
  BsList,
  BsPlus
} from "react-icons/bs";
import axios from "axios";

import Filter from "../components/Filter";
import AddNewProject from "../components/AddNewProject";
import Project from "../components/Project";
import Tasks from "../components/Tasks";

function App() {
  const [projects, setProjects] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/projects?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setProjects(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddNewProject = (obj) => {
    const newProjectList = [...projects, obj];
    setProjects(newProjectList);
  };

  const onEditProjectTitle =(id, title) => {
    const newProjectList = projects.map(project => {
      if (project.id === id) {
        project.name = title;
      }
      return project;
    });
    setProjects(newProjectList);
  };

  // TODO: make update all task list after add new task
  const onAddNewTask = (projectId, taskObj) => {
    const newTasksList = projects.map(project => {
      if (project.id === projectId) {
        project.tasks = [...project.tasks, taskObj];
      }
      return project;
    });
    setProjects(newTasksList);
  };

  // TODO: make update all task list after delete task
  const onRemoveTask = (projectId, taskId) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      const newProjectList = projects.map(project => {
        if (project.id === projectId) {
          project.tasks = project.tasks.filter(task => task.id !==taskId);
        }
        return project;
      });
      setProjects(newProjectList);
      axios
        .delete("http://localhost:3001/tasks/" + taskId)
        .catch(() => {
        alert("Failed to update task tittle")
      });
    }
  }

  // TODO: make update all task list after edit task
  const onEditTask = (projectId, taskObj) => {
    const newTaskTitle = window.prompt("Task title", taskObj.text);

    if (!newTaskTitle) {
      return;
    }

    const newTasksList = projects.map(project => {
      if (project.id === projectId) {
        project.tasks = project.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskTitle;
          }
          return task;
        });
      }
      return project;
    });
    setProjects(newTasksList);
    axios
      .patch("http://localhost:3001/tasks/" + taskObj.id, {
        text: newTaskTitle
      })
      .catch(() => {
        alert("Failed to update task title");
      });
  };

  // TODO: make update all task list after complete task
  const onCompleteTask = (projectId, taskId, completed) => {
    const newProjectList = projects.map(project => {
      if (project.id === projectId) {
        project.tasks = project.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return project;
    });
    setProjects(newProjectList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, {
        completed
      })
      .catch(() => {
        alert("Failed to update task");
      });
  };

  return (
    <div className="app">
      <header className="header app__header">
        <button
          className="button button_type_icon button_theme_light
          button__sidebar-toggle"
          aria-label="Main menu"
        >
          <BsList color="#fff" size="24px"/>
        </button>
        <button
          className="button button_type_icon button_theme_light button__add-task"
          aria-label="Add task"
        >
          <BsPlus color="#fff" size="24px"/>
        </button>
      </header>
      <main className="content app__content">
        <div className="content__sidebar">

          <Filter
            filters={[
              // TODO: Inbox make project list
              {
                icon: (
                  <BsInbox color="#0d6efd"/>
                ),
                title: "Inbox",
                path: "inbox",
              },
              {
                icon: (
                  <BsCalendar color="#198754"/>
                ),
                title: "Today",
                path: "today",
              },
              {
                icon: (
                  <BsCalendar3 color="#6f42c1"/>
                ),
                title: "Planned",
                path: "planned",
              },
              {
                icon: (
                  <BsGrid color="#fd7e14"/>
                ),
                title: "All tasks",
                path: "all",
              }
            ]}
          />

          <AddNewProject colors={colors} onAddNewProject={onAddNewProject} />

          { projects ? (
            <Project
              projects={projects}
              onRemoveProject={id => {
                const newProjectsList = projects.filter(item => item.id !== id);
                setProjects(newProjectsList);
              }}
              onClickItem={project => {
                setActiveItem(project);
              }}
            />
            ) : ("Loading...")
          }
        </div>
        <div className="content__tasks">
          <Routes>
            <Route path="/" element={
              projects && (
                <Tasks
                  project={projects}
                  filter="Today"
                />
              )
            }/>
            <Route path="/sofi-bel/todo" element={
              projects && (
                <Tasks
                  project={projects}
                  filter="Today"
                />
              )
            }
            />
            <Route path="filter/inbox" element={
              projects && (
                <Tasks
                  project={projects}
                  filter="Inbox"
                />
              )
            }
            />
            <Route path="filter/today" element={
              projects && (
                <Tasks
                  project={projects}
                  filter="Today"
                />
              )
            }
            />
            <Route path="filter/planned" element={
              projects && (
                <Tasks
                  project={projects}
                  filter="Planned"
                />
              )
            }
            />
            <Route path="filter/all" element=
              { projects && (
                <Tasks
                  project={projects}
                  onEditTitle={onEditProjectTitle}
                  onAddNewTask={onAddNewTask}
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
                  filter="All"
                />
              )}
            />
            <Route path="projects/:id" element=
              { projects && activeItem && (
                <Tasks
                  project={activeItem}
                  onEditTitle={onEditProjectTitle}
                  onAddNewTask={onAddNewTask}
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
                />
              )}
            />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <p className="footer__author text">&copy; 2022</p>
        <a className="footer__author-link link"
           href="https://www.linkedin.com/in/sofi-bel/"
           target="_blank"
           rel="noopener noreferrer">
          Sofi Bel
        </a>
      </footer>
    </div>
  );
}

export default App;
