export default function TaskList({tasks, onToggleComplete, onTaskDelete}) {
  const taskItems = tasks.map(task =>
    <li key={task.id}>
      {task.title}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <button onClick={() => onTaskDelete(task.id)}>Delete</button>
    </li>
  );

  return (
    <ul>{taskItems}</ul>
  );
}
