import { Link } from "react-router-dom";
import classNames from "classnames";

function Filter({filters}) {
  return (
    <ul className="filter list">
      {
        filters.map((filter, index) => (
          <Link key={index} className="link" to={`/filter/${filter.path}`}>
            <li
              key={index}
              className= {
              classNames(
                "filter__item list__item",
                filter.className,
                { current : filter.current}
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
          </Link>
        ))
      }
    </ul>
  )
}

export default Filter;
