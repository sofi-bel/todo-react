import { BsCheck2, BsPencil, BsX } from "react-icons/bs";

const Task = (props) => {
  const onChangeCheckbox = e => {
    props.onComplete(props.project.id, props.task.id, e.target.checked);
  };

  return (
    <li
      key={props.task.id}
      className="tasks__item task"
    >
      <input
        onChange={onChangeCheckbox}
        id={`task-${props.task.id}`}
        className="task__input_type_checkbox"
        type="checkbox"
        checked={props.task.completed}
      />
      <label htmlFor={`task-${props.task.id}`} className="task__checkbox">
        <BsCheck2 className="task__checkbox-icon"/>
      </label>
      <p className="task__title text">{props.task.text}</p>

      <button
        onClick={() => {
          props.onEdit(props.project.id, props.task)
        }}
        className="task__icon list__icon button button_type_icon"
        aria-label="Edit Task"
      >
        <BsPencil size="10px"/>
      </button>

      <button
        onClick={() => {
          props.onRemove(props.project.id, props.task.id)
        }}
        className="task__icon list__icon button button_type_icon"
        aria-label="Remove Task"
      >
        <BsX size="18px"/>
      </button>
    </li>
  )
}

export default Task;
