import { nanoid } from "nanoid";
import { useState } from "react";
import Task from "../components/Task";


const useTaskManager = (init: Task[]) => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(init);

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

  return {title, setTitle, completeTask, updateTask, addTask, handleSearch, filteredTasks}
};

export default useTaskManager;