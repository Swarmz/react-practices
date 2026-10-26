import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function TaskList({ tasks, onToggleCompletion, onDelete }) {
  const { isDark } = useContext(ThemeContext);

  const taskItems = tasks.map((task) => (
    <li className="task" data-completed={task.completed} key={task.id}>
      <div className="task-content">
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
          />
          <span>{task.title}</span>
        </label>
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  ));

  return (
    <ul
      className="task-list"
      style={{
        backgroundColor: isDark ? "#333333" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#333333",
      }}
    >
      {taskItems}
    </ul>
  );
}
