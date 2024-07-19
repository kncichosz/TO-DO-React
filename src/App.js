import React, { useState } from 'react';

function TasksList() {


  //false means that the task is not completed yet
  const initialTasks = [
    ["Task 1", false],
    ["Task 2", false],
    ["Task 3", false],
    ["Task 4", false],
    ["Task 5", false]
  ];

  const [tasks, setTasks] = useState(initialTasks);

  function deleteTask(indexToDelete){
    setTasks(prevTasks => prevTasks.filter((task, index) => index !== indexToDelete));
  }

  function createTask(){ 
  }

  function finishTask(indexOfCompletedTask){
    setTasks(prevTasks =>  prevTasks.map((task, index) =>  index === indexOfCompletedTask ? [task[0], !task[1]] : task ));
  }

  return (
    <div className='taskList'>
      <ul>
        {tasks.map( (task, index) => <li key={index} >
            <div className={`task ${task[1] ? "finishedTask" : "" }`} onClick={() => finishTask(index)} > {task[0]}</div>
            <button onClick={() => deleteTask(index)}> x </button> 
          </li>)}
      </ul>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>
        <span style={{color: "#ccc"}}>TO-DO </span>
        <span style={{color: "#424d57"}}>LIST</span>
      </h1>
    </header>
  );
}

function Main() {
  return (
    <main>
      <TasksList />
    </main>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;
