import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const { data } = await api.post('/tasks', { title, description });
      setTasks([data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const cycleStatus = (status) => {
    if (status === 'pending') return 'in-progress';
    if (status === 'in-progress') return 'completed';
    return 'pending';
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = cycleStatus(task.status);
      const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={`task-item status-${task.status}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <span className="badge">{task.status}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleToggleStatus(task)}>Next Status</button>
                <button onClick={() => handleDelete(task._id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
