export default function TaskForm({ onTaskAdd }) {
  function handleSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value;

    onTaskAdd(title);

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input name="title" required pattern=".*\S.*" />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}
