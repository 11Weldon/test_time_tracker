// src/App.js
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [timer, setTimer] = useState(0);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const timerRef = useRef(null);

    const handleInputChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handlePlayClick = () => {
        if (currentTask.trim() === '') {
            alert('Введите задачу!');
            return;
        }

        setTasks([...tasks, { task: currentTask, time: 0 }]);
        setActiveTaskIndex(tasks.length);
        setTimer(0);

        timerRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    const handleTaskClick = (index) => {
        if (activeTaskIndex === index) {
            clearInterval(timerRef.current);
            const updatedTasks = [...tasks];
            const elapsedTime = timer;
            updatedTasks[index] = { ...updatedTasks[index], time: elapsedTime, completed: true };
            setTasks(updatedTasks);
            setActiveTaskIndex(null);
        } else {
            alert('Пожалуйста, завершите текущую задачу перед выбором другой.');
        }
    };


    return (
        <div className="App">
            <input type="text" value={currentTask} onChange={handleInputChange} />
            <button onClick={handlePlayClick}>Play</button>

            <div>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} onClick={() => handleTaskClick(index)}>
                            {task.task} - {activeTaskIndex === index ? formatTime(timer) : formatTime(task.time)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} ч ${minutes} м`;
};

export default App;
