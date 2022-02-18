import Filter from "../components/Filter";
import Project from "../components/Project";
import {
  BsInbox,
  BsCalendar3,
  BsGrid,
  BsPlus,
  BsCalendarDay,
  BsList
} from "react-icons/bs";

function App() {
  return (
    <div className="app">
      <header className="header app__header">
        <button
          className="button button_type_icon button__sidebar-toggle"
          aria-label="Main menu"
        >
          <BsList color="#fff" size="24px"/>
        </button>
        <button
          className="button button_type_icon button__add-task"
          aria-label="Add task"
        >
          <BsPlus color="#fff" size="24px"/>
        </button>
      </header>
      <main className="content app__content">
        <div className="content__sidebar">
          <Category
            items={[
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
            projects={[
              {
                color: "blue",
                title: "Personal",
                current: false,
              },
              {
                color: "cyan",
                title: "Someday / maybe",
                current: false,
              },
              {
                color: "teal",
                title: "Routines",
                current: false,
              },
              {
                color: "purple",
                title: "Shopping list",
                current: false,
              },
            ]}
          />
        </div>
        <div className="content__tasks"/>
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
