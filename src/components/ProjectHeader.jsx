import { useState } from "react";
import classNames from "classnames";
import { BsChevronDown, BsPlus } from "react-icons/bs";

import Badge from "./Badge";
import DB from "../assets/db.json";

function ProjectHeader({onNewProject}) {
  const [openPopup, setOpenPopup] = useState(false);
  const [currentColor, selectCurrentColor] = useState(DB.colors[0].id);
  const [nameNewProject, setNameNewProject] = useState("");

  const addProject = () => {
    if(!nameNewProject) {
      alert("Enter project name");
      return;
    }
    const color = DB.colors.filter(c => c.id === currentColor)[0].name;
    onNewProject({"id": Math.random(),
      "name": nameNewProject,
      color
    });
    onClose();
  }

  const onClose = () => {
    setOpenPopup(!openPopup);
    setNameNewProject("");
    selectCurrentColor(DB.colors[0].id);
  }

  return (
    <>
      <div className="project__header list__item">
        <button
          className="project__header-icon project__header-icon_position_left
          list__icon list__icon_position_left
          button button_type_icon"
          aria-label="Toggle list of Projects"
        >
          <BsChevronDown size="16px"/>
        </button>
        <p className="project__header-title text">Projects</p>
        <button
          onClick={() => setOpenPopup(!openPopup)}
          className="project__header-icon project__header-icon_position_right
          list__icon list__icon_position_right
          button button_type_icon"
          aria-label="Add of Project"
        >
          <BsPlus size="21px"/>
        </button>
      </div>
      {openPopup && (
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
                    DB.colors.map((item, index) => (
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
                            onClick={() => selectCurrentColor(item.id)}
                            key={item.id}
                            color={item.name}
                            className={currentColor === item.id && "active"}
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
              <button onClick={onClose}
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

export default ProjectHeader;
