import React, { useState, useEffect } from 'react';

function TaskList({ tasks, onClickTask }) {
    return (
        <div>
            <h2>Список задач</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} onClick={() => onClickTask(index)}>
                        {task.name} - {formatTime(task.time)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => ({
                    ...task,
                    time: task.isActive ? task.time + 1 : task.time,
                }))
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const addTask = () => {
        const newTask = {
            name: taskText || `Задача ${tasks.length + 1}`,
            time: 0,
            isActive: true,
        };
        setTasks([...tasks, newTask]);
        setTaskText('');
    };

    const onClickTask = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task, i) => ({
                ...task,
                isActive: i === index ? !task.isActive : task.isActive,
            }));

            if (!updatedTasks[index].isActive && updatedTasks[index].time < 60) {
                updatedTasks.splice(index, 1);
            }

            return updatedTasks;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Программа с индивидуальными таймерами</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Введите текст задачи"
                />
                <button onClick={addTask} style={{ marginLeft: '8px' }}>Добавить задачу</button>
            </div>
            <TaskList tasks={tasks} onClickTask={onClickTask} />
        </div>
    );
}

export default App;
