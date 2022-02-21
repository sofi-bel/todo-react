import { useState } from "react";
import axios from "axios";
import { BsPlus } from "react-icons/bs";


const AddNewTask = ({project, onAddNewTask}) => {
  const [
    openAddTaskPopup,
    setOpenAddTaskPopup
  ] = useState(false);
  const [nameNewTask, setNameNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onCloseAddTaskPopup = () => {
    setOpenAddTaskPopup(!openAddTaskPopup);
    setNameNewTask("");
  }

  const addTask = () => {
    if (!nameNewTask) {
      alert("Enter task name");
      return;
    }
    const obj = {
      projectId: project.id,
      text: nameNewTask,
      completed: false
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks/", obj)
      .then(({data}) => {
        onAddNewTask(project.id, data);
        onCloseAddTaskPopup();
      })
      .catch(() => {
        alert("Error adding task");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="add-item add-item_type_task">
        <button
          onClick={() => setOpenAddTaskPopup(!openAddTaskPopup)}
          className="add-item__button button button_type_icon"
          aria-label="Add task"
        >
          <BsPlus size="21px"/>
        </button>
        <p className="add-item__title text">Add new task</p>
      </div>

      {
        openAddTaskPopup && (
          <div className="popup page__popup popup_type_add-task">
          <div className="popup__container">
            <h2 className="popup__title title">Add task</h2>
            <form
              name="popup-add-task"
              className="popup__form form"
            >
              <div className="form__content">
                <label
                  htmlFor="task-name"
                  className="form__label"
                >
                  Name
                </label>
                <input
                  value={nameNewTask}
                  onChange={(e) =>
                    setNameNewTask(e.target.value)
                  }
                  type="text"
                  name="task-name"
                  id="task-name"
                  className="form__input"
                  placeholder="Name of task"
                />
              </div>
              <div className="popup__footer">
                <button onClick={onCloseAddTaskPopup}
                        className="form__button button button_theme_secondary"
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  onClick={addTask}
                  className="form__button button button_theme_primary"
                  type="button"
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
        )
      }
    </>
  )
}

export default AddNewTask;
