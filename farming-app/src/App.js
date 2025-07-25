import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({ name: '', type: '', area: '' });
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', surname: '', email: '', username: '', password: '' 
  });
  const [showRegister, setShowRegister] = useState(false);

  // Use relative API URLs for deployment compatibility
  const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

  useEffect(() => {
    if (user) {
      fetchCrops();
    }
  }, [user]);

  const fetchCrops = async () => {
    try {
      const response = await axios.get(`${API_BASE}/crops`);
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const addCrop = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/crops`, newCrop);
      setCrops([...crops, response.data]);
      setNewCrop({ name: '', type: '', area: '' });
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  const deleteCrop = async (id) => {
    try {
      await axios.delete(`${API_BASE}/crops/${id}`);
      setCrops(crops.filter(crop => crop._id !== id));
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/users/login`, loginForm);
      setUser(response.data.user);
      setLoginForm({ username: '', password: '' });
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/users/register`, registerForm);
      alert('Registration successful! Please login.');
      setShowRegister(false);
      setRegisterForm({ name: '', surname: '', email: '', username: '', password: '' });
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const logout = () => {
    setUser(null);
    setCrops([]);
  };

  if (!user) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>🌾 Farm Management System</h1>
          <div className="auth-container">
            {!showRegister ? (
              <form onSubmit={login} className="auth-form">
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
                <button type="submit">Login</button>
                <p>
                  Don't have an account? 
                  <button type="button" onClick={() => setShowRegister(true)}>Register</button>
                </p>
              </form>
            ) : (
              <form onSubmit={register} className="auth-form">
                <h2>Register</h2>
                <input
                  type="text"
                  placeholder="First Name"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={registerForm.surname}
                  onChange={(e) => setRegisterForm({...registerForm, surname: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  required
                />
                <button type="submit">Register</button>
                <p>
                  Already have an account? 
                  <button type="button" onClick={() => setShowRegister(false)}>Login</button>
                </p>
              </form>
            )}
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🌾 Farm Management System</h1>
          <div className="user-info">
            <span>Welcome, {user.name} {user.surname}!</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="add-crop-section">
          <h2>Add New Crop</h2>
          <form onSubmit={addCrop} className="crop-form">
            <input
              type="text"
              placeholder="Crop Name"
              value={newCrop.name}
              onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Crop Type"
              value={newCrop.type}
              onChange={(e) => setNewCrop({...newCrop, type: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Area (hectares)"
              value={newCrop.area}
              onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
              required
            />
            <button type="submit">Add Crop</button>
          </form>
        </section>

        <section className="crops-section">
          <h2>Your Crops</h2>
          {crops.length === 0 ? (
            <p>No crops added yet. Add your first crop above!</p>
          ) : (
            <div className="crops-grid">
              {crops.map(crop => (
                <div key={crop._id} className="crop-card">
                  <h3>{crop.name}</h3>
                  <p><strong>Type:</strong> {crop.type}</p>
                  <p><strong>Area:</strong> {crop.area} hectares</p>
                  <button 
                    onClick={() => deleteCrop(crop._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
