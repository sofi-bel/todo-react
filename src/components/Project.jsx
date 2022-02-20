import classNames from "classnames";
import ProjectHeader from "./ProjectHeader"
import Badge from "./Badge";
import { BsX  } from "react-icons/bs";

function Project({projects, onAddNewProject, onRemoveProject}) {
  const removeProject = (project) => {
    if(window.confirm("Do you really want to delete the project?")) {
      onRemoveProject(project.id);
    }
  };

  return (
    <ul className="project list">
      <ProjectHeader onAddNewProject={onAddNewProject}/>
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
                <Badge color={project.color}/>
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
