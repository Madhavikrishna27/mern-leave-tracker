import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Approvals() {
  const [rows, setRows] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/api/leaves/pending')
      setRows(data)
    } catch (e) {
      setErr(e?.response?.data?.error || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function act(id, action) {
    try {
      await api.patch(`/api/leaves/${id}/${action}`)
      await load()
    } catch (e) {
      alert(e?.response?.data?.error || 'Failed to update')
    }
  }

  if (loading) return <div>Loading…</div>
  if (err) return <div style={{color:'crimson'}}>{err}</div>

  return (
    <div>
      <h2>Pending Approvals</h2>
      {rows.length === 0 ? <p>No pending items.</p> : (
        <table border="1" cellPadding="6" style={{borderCollapse:'collapse'}}>
          <thead>
            <tr><th>Employee</th><th>Type</th><th>Start</th><th>End</th><th>Days</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r._id}>
                <td>{r.employeeId?.name} ({r.employeeId?.email})</td>
                <td>{r.type}</td>
                <td>{new Date(r.startDate).toLocaleDateString()}</td>
                <td>{new Date(r.endDate).toLocaleDateString()}</td>
                <td>{r.days}</td>
                <td>
                  <button onClick={()=>act(r._id, 'approve')}>Approve</button>{' '}
                  <button onClick={()=>act(r._id, 'reject')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
