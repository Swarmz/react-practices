export default function TaskList({tasks}) {
  const taskItems = tasks.map(task =>
    <li key={task.id}>
      {task.title}
    </li>
  );
  return (
    <ul>{taskItems}</ul>
  );
}
