import React, { useState } from 'react';

function TaskTracker() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePlay = () => {
        if (task.trim() === '') {
            return; // Не добавляем пустую задачу
        }

        setIsRunning(true);
        setTasks((prevTasks) => [...prevTasks, { name: task, time: 0 }]);
        setTask('');

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    };

    const handleStop = (index) => {
        setIsRunning(false);
        setTimer(0);

        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, time: timer } : task
            )
        );
    };

    return (
        <div>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handlePlay}>Play</button>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index} onClick={() => handleStop(index)}>
                        {task.name}{' '}
                        {isRunning ? formatTime(timer) : `Затраченное время: ${task.time} сек`};
                    </li>
                ))}
            </ul>

            {isRunning && timer < 60 && (
                <div>Задачи длительностью менее 1 минуты не сохраняются!</div>
            )}
        </div>
    );
}

export default TaskTracker;
