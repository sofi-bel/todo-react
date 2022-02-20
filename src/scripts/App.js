import { useState, useEffect } from "react";
import axios from "axios";
import {
  BsInbox,
  BsCalendar3,
  BsGrid,
  BsPlus,
  BsCalendarDay,
  BsList
} from "react-icons/bs";

import Filter from "../components/Filter";
import Project from "../components/Project";
import Tasks from "../components/Tasks";

import DB from "../assets/db.json";

function App() {
  const [projects, setProjects] = useState(DB.projects.map(item => {
    item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
    return item;
  }));
  const [colors, setColors] = useState(1);

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
              {
                icon: (
                  <BsInbox color="#0d6efd"/>
                ),
                title: "Inbox",
                current: true,
              },
              {
                icon: (
                  <BsCalendarDay color="#198754"/>
                ),
                title: "Today",
                current: false,
              },
              {
                icon: (
                  <BsCalendar3 color="#6f42c1"/>
                ),
                title: "Planned",
                current: false,
              },
              {
                icon: (
                  <BsGrid color="#fd7e14"/>
                ),
                title: "All tasks",
                current: false,
              }
            ]}
          />
          <Project
            projects={projects}
            colors={colors}
            onAddNewProject = {onAddNewProject}
            onRemoveProject = {id => {
              const newProjectsList = projects.filter(item => item.id !== id);
              setProjects(newProjectsList);
            }}
          />
        </div>
        <div className="content__tasks">
          <Tasks />
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
