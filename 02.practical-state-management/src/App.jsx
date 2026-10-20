import { useReducer } from "react";
import "./App.css";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";

function tasksReducer(state, action) {
  switch (action.type) {
    case "added_task":
      return {
        history: [...state.history, state.tasks],
        tasks: [
          ...state.tasks,
          { id: Date.now(), title: action.title, completed: false },
        ],
      };
    case "completed_task":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };
    case "deleted_task":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "undo_task":
      if (state.history.length === 0) return state;
      return {
        history: state.history.slice(0, -1),
        tasks: state.history[state.history.length - 1],
      };
    default:
      return state;
  }
}

function App() {
  const initialState = {
    tasks: [],
    history: [],
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  function handleAdd(title) {
    dispatch({
      type: "added_task",
      id: Date.now(),
      title: title,
      completed: false,
    });
  }

  function handleToggle(taskId) {
    dispatch({
      type: "completed_task",
      id: taskId,
    });
  }

  function handleDelete(taskId) {
    dispatch({
      type: "deleted_task",
      id: taskId,
    });
  }

  function handleUndo() {
    dispatch({ type: "undo_task" });
  }

  return (
    <>
      <h1>Tasks</h1>
      {state.tasks.length > 0 ? (
        <TaskList
          tasks={state.tasks}
          onToggleComplete={handleToggle}
          onTaskDelete={handleDelete}
        />
      ) : (
        <p>No tasks yet.</p>
      )}
      <TaskForm onTaskAdd={handleAdd} />
      <button onClick={() => handleUndo()}>Undo</button>
    </>
  );
}

export default App;
