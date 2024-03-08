import "./TaskManager.css";
import Task from "./Task";
import useTaskManager from "../hooks/useTaskManager";

// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const {title, setTitle, completeTask, updateTask, addTask, handleSearch, filteredTasks} = useTaskManager([])

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
