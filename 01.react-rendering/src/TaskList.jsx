export default function TaskList({ tasks, onToggleComplete, onTaskDelete }) {
  const taskItems = tasks.map((task) => (
    <li className="task" data-completed={task.completed} key={task.id}>
      <div className="task-content">
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <span>{task.title}</span>
        </label>
      </div>
      <button onClick={() => onTaskDelete(task.id)}>Delete</button>
    </li>
  ));

  return <ul className="task-list">{taskItems}</ul>;
}
