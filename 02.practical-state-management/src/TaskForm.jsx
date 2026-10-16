import { useState } from "react";

export default function TaskForm({ onTaskAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onTaskAdd(title);

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          name="title"
          required
          pattern=".*\S.*"
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}
