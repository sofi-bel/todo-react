import classNames from "classnames";

import ProjectHeader from "./ProjectHeader"
import Badge from "./Badge";

function Project({projects, colors}) {
  return (
    <ul className="project list">
      <ProjectHeader colors={colors}/>
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
            <span className="project__title list__title">{item.title}</span>
          </li>
        ))
      }
    </ul>
  )
}

export default Project;
