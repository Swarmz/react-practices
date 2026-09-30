// import { useState } from 'react'
// import './App.css'
import TaskList from './TaskList.jsx'
import { TASKS } from './taskData.js'


function App() {
  return (
    <>
    <h1>Tasks</h1>
    <TaskList tasks={TASKS}/>
    </>
  )
}

export default App
