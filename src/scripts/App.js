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

  const onAddNewTask = (projectId, taskObj) => {
    const newTasksList = projects.map(project => {
      if (project.id === projectId) {
        project.tasks = [...project.tasks, taskObj];
      }
      return project;
    });
    setProjects(newTasksList);
  };

  const onEditListTitle =(id, title) => {
    const newProjectList = projects.map(project => {
      if(project.id === id) {
        project.name = title;
      }
      return project;
    });
    setProjects(newProjectList);
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
          { projects &&
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
          }
        </div>
        <div className="content__tasks">
          <Routes>
            <Route path="/" element={
              <Tasks
                project={projects}
                filter="Today"
              />
            }/>
            <Route path="/a-meti/todo" element={
              <Tasks
                project={projects}
                filter="Today"
              />
            }
            />
            <Route path="filter/inbox" element={
              <Tasks
                project={projects}
                filter="Inbox"
              />
            }
            />
            <Route path="filter/today" element={
              <Tasks
                project={projects}
                filter="Today"
              />
            }
            />
            <Route path="filter/planned" element={
              <Tasks
                project={projects}
                filter="Planned"
              />
            }
            />
            <Route path="filter/all" element={
              <Tasks
                project={projects}
                onEditTitle={onEditListTitle}
                onAddNewTask={onAddNewTask}
                filter="All"
              />
            }
            />
            <Route path="projects/:id" element={
              <Tasks
                project={activeItem}
                onEditTitle={onEditListTitle}
                onAddNewTask={onAddNewTask}
              />
            }/>
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <p className="footer__author text">&copy; 2022</p>
        <a className="footer__author-link link"
           href="https://www.linkedin.com/in/a-meti/"
           target="_blank"
           rel="noopener noreferrer">
          Anastasiia Metikova
        </a>
      </footer>
    </div>
  );
}

export default App;
