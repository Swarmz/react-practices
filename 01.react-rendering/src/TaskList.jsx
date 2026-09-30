export default function TaskList({tasks, onToggleComplete}) {
  const taskItems = tasks.map(task =>
    <li key={task.id}>
      {task.title}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
    </li>
  );
  return (
    <ul>{taskItems}</ul>
  );
}
