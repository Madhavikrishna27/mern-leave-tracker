import React, { useEffect, useState } from 'react'
import api from '../api'

export default function MyRequests() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/leaves/mine')
        setRows(data)
      } catch (e) {
        setErr(e?.response?.data?.error || 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading…</div>
  if (err) return <div style={{color:'crimson'}}>{err}</div>

  return (
    <div>
      <h2>My Leave Requests</h2>
      <table border="1" cellPadding="6" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr><th>Type</th><th>Start</th><th>End</th><th>Days</th><th>Status</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              <td>{r.type}</td>
              <td>{new Date(r.startDate).toLocaleDateString()}</td>
              <td>{new Date(r.endDate).toLocaleDateString()}</td>
              <td>{r.days}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
