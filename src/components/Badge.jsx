import classNames from "classnames";

function Badge({color, onClick, className, size}) {
  return (
    <div
      onClick={onClick}
      className={
        classNames(
          "badge",
          { [`badge_color_${color}`]: color },
          { [`badge_size_${size}`]: size },
          className
        )
      }
    />
  )
}

export default Badge;
