import React, { useState } from 'react'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('manager@example.com')
  const [password, setPassword] = useState('Password1!')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      window.location.href = '/'
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:380, margin:'40px auto', display:'grid', gap:12}}>
      <h2>Login</h2>
      <label>Email
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <label>Password
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </label>
      {error && <div style={{color:'crimson'}}>{error}</div>}
      <button disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      <p style={{fontSize:12, opacity:0.8}}>
        Tip: create users via POST /api/auth/register (EMPLOYEE/MANAGER/ADMIN).
      </p>
    </form>
  )
}
