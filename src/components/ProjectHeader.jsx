import { BsChevronDown } from "react-icons/bs";
import AddNewProject from "./AddNewProject";

function ProjectHeader({onAddNewProject}) {
  return (
    <div className="project__header list__item">
      <button
        className="project__header-icon project__header-icon_position_left
        list__icon list__icon_position_left
        button button_type_icon"
        aria-label="Toggle list of Projects"
      >
        <BsChevronDown size="16px"/>
      </button>
      <p className="project__header-title list__title text">Projects</p>
      <AddNewProject onAddNewProject = {onAddNewProject} />
    </div>
  )
}

export default ProjectHeader;
