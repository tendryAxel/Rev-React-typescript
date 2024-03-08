import { nanoid } from "nanoid";
import React, { useState } from "react";
import "./TaskManager.css";
import Task from "./Task";

// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // remove task from list
  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Task) => {
    const newTasks = tasks.slice();

    const index = tasks.findIndex((task) => task.id === id);

    taskUpdate.id = id;
    newTasks[index] = taskUpdate;

    setTasks(newTasks);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = new Task(nanoid(), title);
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    const htmlInputElement = (ev.target as HTMLInputElement);
    const value: string = htmlInputElement.value;
    setSearchKeyword(value ? value : "");
  };

  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <label htmlFor={title}>{}</label>
        <input
          id={title}
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={String(task.id)} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, new Task("", (e.target as HTMLInputElement).value))}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
