import axios from "axios";
import classNames from "classnames";
import { BsX  } from "react-icons/bs";

import Badge from "./Badge";

function Project({projects, onRemoveProject}) {
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
          <li
            key={index}
            className= {
              classNames(
                "project__item list__item",
                project.className,
                { current : project.current}
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
            <button
              onClick={() => removeProject(project)}
              className="project__icon project__icon_position_right
              list__icon list__icon_position_right button button_type_icon"
              aria-label="Remove Project"
            >
              <BsX size="18px"/>
            </button>
          </li>
        ))
      }
    </ul>
  )
}

export default Project;
