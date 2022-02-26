import { Link } from "react-router-dom";
import { BsX } from "react-icons/bs";
import axios from "axios";
import classNames from "classnames";

import Badge from "./Badge";

function Project({projects, onRemoveProject, onClickItem, activeItem}) {
  const removeProject = (project) => {
    if(window.confirm("Do you really want to delete the project?")) {
      axios.delete("http://localhost:3001/projects/" + project.id).then(() => {
        onRemoveProject(project.id);
      });
    }
  };

  return (
    <ul className="project list">
      {
        projects.map((project, index) => (
          <Link className="link" to={`/projects/${project.id}`} key={index}>
            <li
              onClick={onClickItem ? () => onClickItem(project) : null}
              key={index}
              className= {
                classNames(
                  "project__item list__item",
                  project.className,
                  { current : activeItem &&  activeItem.id === project.id}
                )
              }
            >
              {
                <div
                  className="project__icon project__icon_position_left
                  list__icon list__icon_position_left">
                  <Badge color={project.color.name}/>
                </div>
              }
              <span className="project__title list__title">{project.name}</span>
              {project.tasks && project.tasks.length}
              <button
                onClick={() => removeProject(project)}
                className="project__icon project__icon_position_right
                list__icon list__icon_position_right button button_type_icon"
                aria-label="Remove Project"
              >
                <BsX size="18px"/>
              </button>
            </li>
          </Link>
        ))
      }
    </ul>
  )
}

export default Project;
