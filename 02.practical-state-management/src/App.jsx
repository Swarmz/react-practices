import { useReducer, useContext } from "react";
import "./App.css";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";
import { ThemeProvider } from "./ThemeProvider.jsx";
import { ThemeContext } from "./ThemeContext";

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

function AppContent() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const initialState = {
    tasks: [],
    history: [],
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  function handleThemeToggle() {
    setIsDark(!isDark);
  }

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
    <div
      className="background-wrapper"
      style={{
        backgroundColor: isDark ? "#222222" : "#F3F4F6",
        color: isDark ? "#FFFFFF" : "#333333",
      }}
    >
      <button onClick={() => handleThemeToggle()}>Theme</button>
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
    </div>
  );
}

function App() {
  return (
    <>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </>
  );
}

export default App;
