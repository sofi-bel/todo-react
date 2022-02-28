import {useEffect, useState} from "react";
import { BsPlus } from "react-icons/bs";
import axios from "axios";
import classNames from "classnames";

import Badge from "./Badge";

function AddNewProject({colors, onAddNewProject}) {
  const [
    openAddProjectPopup,
    setOpenAddProjectPopup
  ] = useState(false);
  const [colorNewProject, setColorNewProject] = useState(1);
  const [nameNewProject, setNameNewProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setColorNewProject(colors[0].id);
    }
  }, [colors]);

  const onCloseAddProjectPopup = () => {
    setOpenAddProjectPopup(!openAddProjectPopup);
    setNameNewProject("");
    setColorNewProject(colors[0].id);
  }

  const addProject = () => {
    if (!nameNewProject) {
      alert("Enter project name");
      return;
    }
    const obj = {
      name: nameNewProject,
      colorId: colorNewProject,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/projects", obj)
      .then(({data}) => {
        const color = colors.filter(c => c.id === colorNewProject)[0];
        const projectData = {...data, color};
        onAddNewProject(projectData);
        onCloseAddProjectPopup();
      })
      .catch(() => {
        alert("Error adding list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="add-item add-item_type_project">
        <button
          onClick={() => setOpenAddProjectPopup(!openAddProjectPopup)}
          className="add-item__button button button_type_icon"
          aria-label="Add Project"
        >
          <BsPlus size="21px"/>
        </button>
        <p className="add-item__title text">Add new Projects</p>
      </div>

      {
        openAddProjectPopup && (
          <div className="popup page__popup popup_type_add-project">
          <div className="popup__container">
            <h2 className="popup__title title">Add project</h2>
            <form
              name="popup-add-project"
              className="popup__form form"
            >
              <div className="form__content">
                <label
                  htmlFor="project-name"
                  className="form__label"
                >
                  Name
                </label>
                <input
                  value={nameNewProject}
                  onChange={(e) =>
                    setNameNewProject(e.target.value)
                  }
                  type="text"
                  name="project-name"
                  id="project-name"
                  className="form__input"
                  placeholder="Name of project"
                />
                <label
                  htmlFor="project-color"
                  className="form__label"
                >
                  Color icon
                </label>
                <div className="form__colors">
                  <ul className="colors__list list">
                    {
                      colors.map((color, index) => (
                        <li
                          key={index}
                          className= {
                            classNames(
                              "colors__item"
                            )
                          }
                        >
                          {
                            <Badge
                              onClick={() => setColorNewProject(color.id)}
                              key={color.id}
                              color={color.name}
                              className={
                                colorNewProject === color.id && "active"
                              }
                              size= "big"
                            />
                          }
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="popup__footer">
                <button onClick={onCloseAddProjectPopup}
                        className="form__button button button_theme_secondary"
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  onClick={addProject}
                  className="form__button button button_theme_primary"
                  type="button"
                >
                  {isLoading ? 'Saving...' : 'Save'}
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

export default AddNewProject;
