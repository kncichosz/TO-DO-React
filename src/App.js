import React, { useState } from "react";

function ToDoForm(props) {
  return (
    <div>
      <input type="text" onChange={props.onChange} value={props.draft} />
      <button onClick={props.onSubmit}>Add</button>
    </div>
  );
}

function TasksList() {
  //false means that the task is not completed yet
  const initialTasks = {
    title: "My To-Do List",
    tasks: [
      { name: "Task 1", completed: false },
      { name: "Task 2", completed: false },
      { name: "Task 3", completed: false },
      { name: "Task 4", completed: false },
      { name: "Task 5", completed: false },
    ],
  };

  const [tasksData, setTasksData] = useState(initialTasks);
  const [draft, setDraft] = useState("");

  function deleteTask(indexToDelete) {
    setTasksData((prevTasksData) => ({
      ...prevTasksData,
      tasks: prevTasksData.tasks.filter((_, index) => index !== indexToDelete),
    }));
  }

  function updateDraft(event) {
    setDraft(event.target.value);
  }

  function createTask() {
    const newTask = { name: draft, completed: false };
    setTasksData((prevTasksData) => ({
      ...prevTasksData,
      tasks: [...prevTasksData.tasks, newTask],
    }));
    setDraft("");
  }

  function finishTask(indexOfCompletedTask) {
    setTasksData((prevTasksData) => ({
      ...prevTasksData,
      tasks: prevTasksData.tasks.map((task, index) =>
        index === indexOfCompletedTask
          ? { ...task, completed: !task.completed }
          : task
      ),
    }));
  }

  return (
    <div className="taskList">
      <h2>{tasksData.title}</h2>
      <ul>
        {tasksData.tasks.map((task, index) => (
          <li key={index}>
            <div
              className={`task ${task[1] ? "finishedTask" : ""}`}
              onClick={() => finishTask(index)}
            >
              {" "}
              {task.name}
            </div>
            <button onClick={() => deleteTask(index)}> &times; </button>
          </li>
        ))}
      </ul>
      <ToDoForm onSubmit={createTask} onChange={updateDraft} draft={draft} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>
        <span style={{ color: "#ccc" }}>TO-DO </span>
        <span style={{ color: "#424d57" }}>LIST</span>
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
