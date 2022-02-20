import { useState } from "react";
import classNames from "classnames";
import { BsPlus } from "react-icons/bs";

import Badge from "./Badge";
import DB from "../assets/db.json";

function AddNewProject({onAddNewProject}) {
  const [
    openAddProjectPopup,
    setOpenAddProjectPopup
  ] = useState(false);
  const [colorNewProject, setColorNewProject] = useState(DB.colors[0].id);
  const [nameNewProject, setNameNewProject] = useState("");

  const onCloseAddProjectPopup = () => {
    setOpenAddProjectPopup(!openAddProjectPopup);
    setNameNewProject("");
    setColorNewProject(DB.colors[0].id);
  }

  const addProject = () => {
    if(!nameNewProject) {
      alert("Enter project name");
      return;
    }
    const colorProject = DB.colors.filter(
      color => color.id === colorNewProject
    )[0].name;
    onAddNewProject(
      {
        "id": Math.random(),
        "name": nameNewProject,
        color: colorProject
      }
    );
    onCloseAddProjectPopup();
  }

  return (
    <>
      <button
        onClick={() => setOpenAddProjectPopup(!openAddProjectPopup)}
        className="project__header-icon project__header-icon_position_right
          list__icon list__icon_position_right
          button button_type_icon"
        aria-label="Add Project"
      >
        <BsPlus size="21px"/>
      </button>
      {openAddProjectPopup && (
        <div className="popup page__popup popup_type_add-project">
          <div className="popup__container">
            <h2 className="popup__title title">Add project</h2>
            <form
              name="popup-add-project"
              className="popup__form form form_type_add-project"
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
                  placeholder="Shopping list"
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
                      DB.colors.map((color, index) => (
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
                              className={colorNewProject === color.id && "active"}
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
                  onClick={addProject}
                  className="form__button button button_theme_primary"
                  type="button"
                >
                  Save
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
