import { BsCheck2, BsPencil, BsX } from "react-icons/bs";

function Tasks() {
  return (
    <div className="tasks">
      <div className="tasks__header">
        <h1 className="tasks__title title">Personal</h1>
        <button
          className="button button_type_icon list__icon"
          aria-label="Edit project name"
        >
          <BsPencil />
        </button>
      </div>
      <ul className="tasks__list list">
        <li className="tasks__item task">
          <input
            id="check"
            className="task__input_type_checkbox"
            type="checkbox"
          />
          <label htmlFor="check" className="task__checkbox">
            <BsCheck2 className="task__checkbox-icon" />
          </label>
          <p className="task__title text">task</p>
          <button
            className="task__icon list__icon button button_type_icon"
            aria-label="Remove Task"
          >
            <BsX size="18px"/>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Tasks;
