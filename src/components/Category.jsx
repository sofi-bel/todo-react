function Category({items}) {
  return (
    <ul className="category list">
      {
        items.map(item => (
          <li className=
                {
            item.current ? "category__item current" : "category__item"
          }
          >
              {
                item.icon ? (
                  item.icon
                ) : (
                  <i className={`badge badge_color_${item.color}`} />
                )
              }
            <span className="category__title">{item.title}</span>
          </li>
        ))
      }
    </ul>
  )
}

export default Category;
