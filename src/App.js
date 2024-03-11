import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskList({ tasks, onClickTask }) {
    return (
        <div style={{ marginTop: '0px', width: '40%', borderTop: '1px white', borderBottom: '1px white' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        onClick={() => onClickTask(index, task.time, task.name)}
                        style={{
                            padding: '12px', // Увеличил размер задачи
                            borderBottom: '1px solid white',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>{task.name}</span>
                        <span style={{color: 'blue'}}>{formatTime(task.time)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } else {
        return `${minutes} мин`;
    }
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

    const onClickTask = (index, time, name) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task, i) => ({
                ...task,
                isActive: i === index ? !task.isActive : task.isActive,
            }));

            if (!updatedTasks[index].isActive && updatedTasks[index].time < 60) {
                toast.error(`Внимание! Время для задачи "${name}" меньше 1 минуты!`);
                updatedTasks.splice(index, 1);
            }

            return updatedTasks;
        });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'black',
            color: 'white'
        }}>
            <h1></h1>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#000000',
                padding: '5px',
                borderRadius: '8px',
                marginBottom: '2px',
                width: '40%'
            }}>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder=""
                    style={{
                        flex: 1,
                        marginRight: '8px',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px',
                        backgroundColor: '#222222',
                        color: 'white'
                    }}
                />
                <svg onClick={addTask}
                     width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none"
                     xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M11.0748 7.50835C9.74622 6.72395 8.25 7.79065 8.25 9.21316V14.7868C8.25 16.2093 9.74622 17.276 11.0748 16.4916L15.795 13.7048C17.0683 12.953 17.0683 11.047 15.795 10.2952L11.0748 7.50835ZM9.75 9.21316C9.75 9.01468 9.84615 8.87585 9.95947 8.80498C10.0691 8.73641 10.1919 8.72898 10.3122 8.80003L15.0324 11.5869C15.165 11.6652 15.25 11.8148 15.25 12C15.25 12.1852 15.165 12.3348 15.0324 12.4131L10.3122 15.2C10.1919 15.271 10.0691 15.2636 9.95947 15.195C9.84615 15.1242 9.75 14.9853 9.75 14.7868V9.21316Z"
                              fill="#ffffff"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                              fill="#ffffff"></path>
                    </g>
                </svg>
                {/*<img*/}
                {/*    // src="../public/favicon.ico"  // Укажите путь к вашему SVG-изображению*/}
                {/*    // src="../public/1.svg"*/}
                {/*    // src="logo192.png"*/}
                {/*    alt=""*/}
                {/*    className="pls"*/}


                {/*    onClick={addTask}*/}
                {/*    style={{cursor: 'pointer', borderRadius: '8px', width: "20", height: "20"}}*/}
                {/*></img>*/}

            </div>
            <TaskList tasks={tasks} onClickTask={onClickTask}/>
            <ToastContainer/>
        </div>
    );
}

export default App;
