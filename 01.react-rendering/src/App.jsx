import { useState } from 'react'
// import './App.css'
import TaskList from './TaskList.jsx'
import { TASKS } from './taskData.js'


function App() {
  const [tasks, setTasks] = useState(TASKS);

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

  return (
    <>
    <h1>Tasks</h1>
    <TaskList tasks={tasks} onToggleComplete={handleToggle} onTaskDelete={handleDelete}/>
    </>
  )
}

export default App
