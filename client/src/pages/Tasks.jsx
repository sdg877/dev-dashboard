import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`, { headers });
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/tasks`, { text }, { headers });
    setTasks([...tasks, res.data]);
    setText('');
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/tasks/${id}`, { completed: !completed }, { headers });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`, { headers });
    setTasks(tasks.filter(t => t._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <form onSubmit={addTask}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New task..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              onClick={() => toggleComplete(task._id, task.completed)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '1rem' }}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
