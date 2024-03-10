import React, { useState, useEffect } from 'react';

function TaskList({ tasks, onClickTask }) {
    return (
        <div style={{ marginTop: '0px', width: '50%', borderTop: '1px white', borderBottom: '1px white' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        onClick={() => onClickTask(index)}
                        style={{
                            padding: '12px', // Увеличил размер задачи
                            borderBottom: '1px solid white',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>{task.name}</span>
                        <span>{formatTime(task.time)}</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'black', color: 'white' }}>
            <h1></h1>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'grey', padding: '5px', borderRadius: '8px', marginBottom: '2px', width: '50%' }}>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder=""
                    style={{ flex: 1, marginRight: '8px', border: 'none', borderRadius: '4px', padding: '8px', backgroundColor: '(60,60,60)' }}
                />
                <button onClick={addTask} style={{ borderRadius: '4px', padding: '8px', backgroundColor: 'white', border: 'none', cursor: 'pointer' }}>Добавить задачу</button>
            </div>
            <TaskList tasks={tasks} onClickTask={onClickTask} />
        </div>
    );
}

export default App;
