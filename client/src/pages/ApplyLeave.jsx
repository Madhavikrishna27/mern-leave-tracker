import React, { useState } from 'react'
import api from '../api'

export default function ApplyLeave() {
  const [type, setType] = useState('VACATION')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [reason, setReason] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr(''); setMsg('')
    try {
      const { data } = await api.post('/api/leaves', {
        type, startDate: start, endDate: end, reason
      })
      setMsg(`Leave submitted (${data.days} day(s)).`)
      setStart(''); setEnd(''); setReason('')
    } catch (e) {
      setErr(e?.response?.data?.error || 'Failed to submit leave')
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:520, margin:'0 auto', display:'grid', gap:10}}>
      <h2>Apply Leave</h2>
      <label>Type
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option>SICK</option>
          <option>VACATION</option>
          <option>UNPAID</option>
          <option>OTHER</option>
        </select>
      </label>
      <label>Start date
        <input type="date" value={start} onChange={e=>setStart(e.target.value)} />
      </label>
      <label>End date
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
      </label>
      <label>Reason
        <textarea value={reason} onChange={e=>setReason(e.target.value)} />
      </label>
      {msg && <div style={{color:'green'}}>{msg}</div>}
      {err && <div style={{color:'crimson'}}>{err}</div>}
      <button>Submit</button>
    </form>
  )
}
