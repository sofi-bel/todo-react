import classNames from "classnames";

import ProjectHeader from "./ProjectHeader"
import Badge from "./Badge";
import { BsX  } from "react-icons/bs";

function Project({projects, onAddProject, onRemoveProject}) {
  const removeProject = (project) => {
    if(window.confirm("Do you really want to delete the project?")) {
      onRemoveProject(project.id);
    }
  };

  return (
    <ul className="project list">
      <ProjectHeader onNewProject={onAddProject}/>
      {
        projects.map((item, index) => (
          <li
            key={index}
            className= {
              classNames(
                "project__item list__item",
                item.className,
                { current : item.current}
              )
            }
          >
            {
              <div
                className="project__icon project__icon_position_left
                list__icon list__icon_position_left">
                <Badge color={item.color}/>
              </div>
            }
            <span className="project__title list__title">{item.name}</span>
            <button
              onClick={() => removeProject(item)}
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
