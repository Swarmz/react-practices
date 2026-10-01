import { useState } from 'react'
import './App.css'
import TaskList from './TaskList.jsx'
import TaskForm from './TaskForm.jsx'


function App() {
  const [tasks, setTasks] = useState([]);

  function handleToggle(taskId) {
    setTasks(
      tasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleAdd(title) {
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
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
    <TaskForm onTaskAdd={handleAdd}/>
    </>
  );
}

export default App
