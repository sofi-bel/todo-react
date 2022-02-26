import { useEffect, useState } from "react";
import { BsCheck2, BsPencil, BsX } from "react-icons/bs";
import axios from "axios";

import AddNewTask from "./AddNewTask";

const Tasks = ({
  project,
  onEditTitle,
  onAddNewTask,
  filter
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Enter new tittle", project.name);
    if(newTitle) {
      onEditTitle(project.id, newTitle);
      axios
        .patch("http://localhost:3001/projects/" + project.id, {
          name: newTitle
        })
        .catch(() => {
          alert("Failed to update project tittle")
        });
    }
  }

  const [allTasks, setAllTasks] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then(({ data }) => {
        setAllTasks(data);
      });
  }, []);

  return (
    <div className="tasks">
      <div className="tasks__header">
        <h1 className="tasks__title title">
          {project.name || `${filter} tasks`}
        </h1>
        {!filter &&
          <button
            onClick={editTitle}
            className="button button_type_icon list__icon"
            aria-label="Edit project name"
          >
            <BsPencil/>
          </button>
        }
      </div>
      {!filter &&
        <AddNewTask
          key={project.id}
          project={project}
          onAddNewTask={onAddNewTask}
        />
      }
      <ul
        className="tasks__list list"
        id={project.id}
        key={`project-${project.id}`}
      >
        {
          project.tasks && !project.tasks.length && (
            <h2 className="tasks__message title">No tasks</h2>
        )}
        {
          !project.tasks && filter !== "All" && (
            <h2 className="tasks__message title">No tasks</h2>
          )}
        {
          allTasks && filter === "All" && allTasks.map(task =>
            <li
              key={task.id}
              className="tasks__item task"
            >
              <input
                id={`task-${task.id}`}
                className="task__input_type_checkbox"
                type="checkbox"
              />
              <label htmlFor={`task-${task.id}`} className="task__checkbox">
                <BsCheck2 className="task__checkbox-icon" />
              </label>
              <input
                type="text"
                className="task__title"
                value={task.text}
                readOnly
              />
              <button
                className="task__icon list__icon button button_type_icon"
                aria-label="Remove Task"
              >
                <BsX size="18px"/>
              </button>
            </li>
          )
        }
        {
          project.tasks && project.tasks.map(task => (
            <li
              key={task.id}
              className="tasks__item task"
            >
              <input
                id={`task-${task.id}`}
                className="task__input_type_checkbox"
                type="checkbox"
              />
              <label htmlFor={`task-${task.id}`} className="task__checkbox">
                <BsCheck2 className="task__checkbox-icon" />
              </label>
              <input
                type="text"
                className="task__title"
                value={task.text}
                readOnly
              />
              <button
                className="task__icon list__icon button button_type_icon"
                aria-label="Remove Task"
              >
                <BsX size="18px"/>
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Tasks;
