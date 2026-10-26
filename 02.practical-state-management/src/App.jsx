import { useReducer, useContext } from "react";
import "./App.css";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";
import { ThemeProvider } from "./ThemeProvider.jsx";
import { ThemeContext } from "./ThemeContext";

function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        history: [...state.history, state.tasks],
        tasks: [
          ...state.tasks,
          { id: action.id, title: action.title, completed: action.completed },
        ],
      };
    case "toggle_completion":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };
    case "delete":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "undo":
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

  function handleToggleTheme() {
    setIsDark(!isDark);
  }

  function handleAddTask(title) {
    dispatch({
      type: "add",
      id: Date.now(),
      title: title,
      completed: false,
    });
  }

  function handleToggleTaskCompletion(id) {
    dispatch({
      type: "toggle_completion",
      id: id,
    });
  }

  function handleDeleteTask(id) {
    dispatch({
      type: "delete",
      id: id,
    });
  }

  function handleUndo() {
    dispatch({ type: "undo" });
  }

  return (
    <div
      className="background-wrapper"
      style={{
        backgroundColor: isDark ? "#222222" : "#F3F4F6",
        color: isDark ? "#FFFFFF" : "#333333",
      }}
    >
      <button onClick={() => handleToggleTheme()}>Theme</button>
      <h1>Tasks</h1>
      {state.tasks.length > 0 ? (
        <TaskList
          tasks={state.tasks}
          onToggleCompletion={handleToggleTaskCompletion}
          onDelete={handleDeleteTask}
        />
      ) : (
        <p>No tasks yet.</p>
      )}
      <TaskForm onAdd={handleAddTask} />
      <button
        onClick={() => handleUndo()}
        disabled={state.history.length === 0}
      >
        Undo
      </button>
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
