import { useReducer } from "react";
import "./App.css";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

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

  function handleAdd(title) {
    dispatch({
      type: "added_task",
      id: Date.now(),
      title: title,
      completed: false,
    });
  }

  return (
    <>
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggle}
          onTaskDelete={handleDelete}
        />
      ) : (
        <p>No tasks yet.</p>
      )}
      <TaskForm onTaskAdd={handleAdd} />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "completed_task": {
      return tasks.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task,
      );
    }
    case "deleted_task": {
      return tasks.filter((task) => task.id !== action.id);
    }
    case "added_task": {
      return [
        ...tasks,
        { id: Date.now(), title: action.title, completed: false },
      ];
    }
  }
}

export default App;
