import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function TaskForm({ onTaskAdd }) {
  const [title, setTitle] = useState("");

  const { isDark } = useContext(ThemeContext);

  function handleSubmit(event) {
    event.preventDefault();

    onTaskAdd(title);

    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      style={{
        backgroundColor: isDark ? "#333333" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#333333",
      }}
    >
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
