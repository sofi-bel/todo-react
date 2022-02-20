import classNames from "classnames";

function Filter({filters}) {
  return (
    <ul className="filter list">
      {
        filters.map((filter, index) => (
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
              <div className="filter__icon list__icon list__icon_position_left">
                {filter.icon}
              </div>
            }
            <span className="filter__title list__title">{filter.title}</span>
          </li>
        ))
      }
    </ul>
  )
}

export default Filter;
