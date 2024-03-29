import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";

import AddNewTask from "./AddNewTask";
import Task from "./Task";

const Tasks = ({
  project,
  onEditProjectTitle,
  onAddNewTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  filter
}) => {
  const editProjectTitle = () => {
    const newTitle = window.prompt("Enter new tittle", project.name);
    if(newTitle) {
      onEditProjectTitle(project.id, newTitle);
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
        {/*TODO: Fix a problem related to refresh page */}
        <h1 className="tasks__title title">
          { !filter ? project.name : `${filter} tasks` }
        </h1>
        {!filter &&
          <button
            onClick={editProjectTitle}
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
        <ul className="tasks__list list"
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
            <Task
              key={task.id}
              project={project}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              task={task}
            />
          )
        }
        {
          project.tasks && project.tasks.map(task => (
            <Task
              key={task.id}
              project={project}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              task={task}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default Tasks;
