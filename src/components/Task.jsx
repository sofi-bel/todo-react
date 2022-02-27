import { BsCheck2, BsPencil, BsX } from "react-icons/bs";

const Task = (props) => {
  return (
    <li
      key={props.task.id}
      className="tasks__item task"
    >
      <input
        id={`task-${props.task.id}`}
        className="task__input_type_checkbox"
        type="checkbox"
      />
      <label htmlFor={`task-${props.task.id}`} className="task__checkbox">
        <BsCheck2 className="task__checkbox-icon"/>
      </label>
      <p className="task__title text">{props.task.text}</p>
      <button
        className="task__icon list__icon button button_type_icon"
        aria-label="Edit Task"
      >
        <BsPencil size="10px"/>
      </button>
      <div
        onClick={() => {
          props.onRemove(props.project.id, props.task.id)
        }}
        className="task__icon list__icon button button_type_icon"
        aria-label="Remove Task"
      >
        <BsX size="18px"/>
      </div>
    </li>
  )
}

export default Task;
