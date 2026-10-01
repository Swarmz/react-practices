export default function TaskForm({ onTaskAdd }){
  function handleSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value;

    onTaskAdd(title);

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <button type="submit">Add Task</button>
    </form>
  );
}
