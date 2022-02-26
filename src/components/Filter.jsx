import { NavLink } from "react-router-dom";
import classNames from "classnames";

function Filter({filters}) {
  const setActive = ({isActive}) =>
    isActive ? "nav-link nav-link_active" : "nav-link";

  return (
    <ul className="filter list">
      {
        filters.map((filter, index) => (
          <NavLink
            key={index}
            className={setActive}
            to={`/filter/${filter.path}`}
            >
            <li
              key={index}
              className= {
              classNames(
                "filter__item list__item",
                filter.className
              )
            }
            >
              {
                <div
                  className="filter__icon list__icon list__icon_position_left"
                >
                  {filter.icon}
                </div>
              }
              <span className="filter__title list__title">{filter.title}</span>
            </li>
          </NavLink>
        ))
      }
    </ul>
  )
}

export default Filter;
