// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    uint256 public taskCount = 0;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string content, bool completed);
    event TaskCompleted(uint256 id, bool completed);
    event TaskRemoved(uint256 id);

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleTaskStatus(uint256 _id) public {
        require(_id > 0 && _id <= taskCount, "Invalid task ID");
        Task storage task = tasks[_id];
        task.completed = !task.completed;
        emit TaskCompleted(_id, task.completed);
    }

    function removeTask(uint256 _id) public {
        require(_id > 0 && _id <= taskCount, "Invalid task ID");
        delete tasks[_id];
        emit TaskRemoved(_id);
    }
}