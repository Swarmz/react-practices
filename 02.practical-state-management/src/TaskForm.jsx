import { useContext, useReducer } from "react";
import { ThemeContext } from "./ThemeContext";

function titleReducer(state, action) {
  switch (action.type) {
    case "set_title": {
      return {
        ...state,
        title: action.title,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function TaskForm({ onTaskAdd }) {
  const [task, dispatch] = useReducer(titleReducer, []);

  const { isDark } = useContext(ThemeContext);

  function handleSetTitle(title) {
    dispatch({
      type: "set_title",
      title: title,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onTaskAdd(task.title);
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
          value={task.title}
          onChange={(event) => handleSetTitle(event.target.value)}
          name="title"
          required
          pattern=".*\S.*"
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}
