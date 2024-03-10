import React, { useState, useEffect } from 'react';

function TaskList({ tasks, onClickTask, onStopTimer }) {
    return (
        <div>
            <h2>Список задач</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task.name} - {task.time}
                        <button onClick={() => onClickTask(index)}>Старт/Стоп</button>
                        <button onClick={() => onStopTimer(index)}>Сбросить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Timer({ time }) {
    return <div>Время: {time}</div>;
}

function App() {
    const [tasks, setTasks] = useState([]);

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
            name: `lol`,
            time: 0,
            isActive: true,
        };
        setTasks([...tasks, newTask]);
    };

    const onClickTask = (index) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) => ({
                ...task,
                isActive: i === index ? !task.isActive : task.isActive,
            }))
        );
    };

    const onStopTimer = (index) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) => ({
                ...task,
                time: i === index ? 0 : task.time,
                isActive: i === index ? false : task.isActive,
            }))
        );
    };

    return (
        <div>
            <h1>Программа с индивидуальными таймерами</h1>
            <button onClick={addTask}>Добавить задачу</button>
            <TaskList tasks={tasks} onClickTask={onClickTask} onStopTimer={onStopTimer} />
        </div>
    );
}

export default App;
