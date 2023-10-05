// src/components/TodoList.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../artifacts/contracts/TodoList.sol/TodoList.json";

const TodoList = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Update with your Ethereum node URL
    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract's deployed address
    const todoListContract = new ethers.Contract(contractAddress, abi, provider.getSigner(0));
    setContract(todoListContract);
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const taskCount = await contract.taskCount();
    const loadedTasks = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.tasks(i);
      loadedTasks.push({ id: i, content: task.content, completed: task.completed });
    }
    setTasks(loadedTasks);
  };

  const addTask = async () => {
    if (taskInput) {
      await contract.createTask(taskInput);
      setTaskInput("");
      loadTasks();
    }
  };

  const toggleTaskStatus = async (taskId) => {
    await contract.toggleTaskStatus(taskId);
    loadTasks();
  };

  const removeTask = async (taskId) => {
    await contract.removeTask(taskId);
    loadTasks();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
            />
            {task.content}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
