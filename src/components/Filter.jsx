import classNames from "classnames";

function Filter({items}) {
  return (
    <ul className="filter list">
      {
        items.map((item, index) => (
          <li
            key={index}
            className= {
            classNames(
              "filter__item list__item",
              item.className,
              { current : item.current}
            )
          }
          >
            {
              <div className="filter__icon list__icon list__icon_position_left">
                {item.icon}
              </div>
            }
            <span className="filter__title list__title">{item.title}</span>
          </li>
        ))
      }
    </ul>
  )
}

export default Filter;
