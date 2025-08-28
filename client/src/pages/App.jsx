import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './Login'
import ApplyLeave from './ApplyLeave'
import MyRequests from './MyRequests'
import Approvals from './Approvals'
import Reports from './Reports'

function Nav() {
  const navigate = useNavigate();
  const authed = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  }
  return (
    <nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #ddd'}}>
      <Link to="/">My Requests</Link>
      <Link to="/apply">Apply Leave</Link>
      {role === 'MANAGER' || role === 'ADMIN' ? <Link to="/approvals">Approvals</Link> : null}
      {role === 'MANAGER' || role === 'ADMIN' ? <Link to="/reports">Reports</Link> : null}
      <div style={{marginLeft:'auto'}}>
        {authed ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  )
}

function RequireAuth({ children }) {
  const authed = !!localStorage.getItem('token');
  return authed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div>
      <Nav />
      <div style={{padding:16}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<RequireAuth><ApplyLeave /></RequireAuth>} />
          <Route path="/" element={<RequireAuth><MyRequests /></RequireAuth>} />
          <Route path="/approvals" element={<RequireAuth><Approvals /></RequireAuth>} />
          <Route path="/reports" element={<RequireAuth><Reports /></RequireAuth>} />
        </Routes>
      </div>
    </div>
  )
}
