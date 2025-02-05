import React, { useState } from "react";

function ToDoForm(props) {
  const [draft, setDraft] = useState("");

  function updateDraft(event) {
    setDraft(event.target.value);
  }

  function handleSubmit() {
    if (draft !== "") {
      props.onSubmit(draft);
      setDraft("");
    }
  }

  return (
    <div>
      <input type="text" onChange={updateDraft} value={draft} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

function TasksList(props) {
  //false means that the task is not completed yet
  const initialTasks = {
    title: props.title,
    tasks: [
      { name: "Task 1", completed: false },
      { name: "Task 2", completed: false },
      { name: "Task 3", completed: false },
      { name: "Task 4", completed: false },
      { name: "Task 5", completed: false },
    ],
  };

  const [tasksData, setTasksData] = useState(initialTasks);

  function deleteTask(indexToDelete) {
    setTasksData((prevTasksData) => ({
      ...prevTasksData,
      tasks: prevTasksData.tasks.filter((_, index) => index !== indexToDelete),
    }));
  }

  function createTask(draft) {
    const newTask = { name: draft, completed: false };
    setTasksData((prevTasksData) => ({
      ...prevTasksData,
      tasks: [...prevTasksData.tasks, newTask],
    }));
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
              className={`task ${task.completed ? "finishedTask" : ""}`}
              onClick={() => finishTask(index)}
            >
              {" "}
              {task.name}
            </div>
            <button onClick={() => deleteTask(index)}> &times; </button>
          </li>
        ))}
      </ul>
      <ToDoForm onSubmit={createTask} />
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
  const initialLists = ["My To-Do List", "Test"];

  const [titles, setTitles] = useState(initialLists);

  function createList(draft) {
    const newList = draft;
    setTitles((prevTitles) => [...prevTitles, newList]);
  }

  return (
    <main>
      <h2>Add new list</h2>
      <ToDoForm onSubmit={createList} />
      {titles.map((list, index) => (
        <TasksList key={index} title={list} />
      ))}
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
