import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const timerRef = useRef(null);

    const handleInputChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handlePlayClick = () => {
        if (currentTask.trim() === '') {
            alert('Введите задачу!');
            return;
        }

        const newTask = { task: currentTask, time: 0, timerId: null };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setCurrentTask('');

        const lastTaskIndex = tasks.length;

        const timerId = setInterval(() => {
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                updatedTasks[lastTaskIndex].time += 1;
                return updatedTasks;
            });
        }, 1000);

        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[lastTaskIndex].timerId = timerId;
            return updatedTasks;
        });
    };

    const handleTaskClick = (index) => {
        clearInterval(tasks[index].timerId);

        const updatedTasks = [...tasks];
        updatedTasks[index].timerId = null;

        setTasks(updatedTasks);
    };

    useEffect(() => {
        return () => {
            // Очищаем все таймеры при размонтировании компонента
            tasks.forEach((task) => {
                if (task.timerId !== null) {
                    clearInterval(task.timerId);
                }
            });
        };
    }, [tasks]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} ч ${minutes} м`;
    };

    return (
        <div className="App">
            <input type="text" value={currentTask} onChange={handleInputChange} />
            <button onClick={handlePlayClick}>Play</button>

            <div>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} onClick={() => handleTaskClick(index)}>
                            {task.task} - {formatTime(task.time)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
