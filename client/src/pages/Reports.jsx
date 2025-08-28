import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Reports() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')

  async function run() {
    setErr('')
    try {
      const params = new URLSearchParams()
      if (from) params.append('from', from)
      if (to) params.append('to', to)
      const { data } = await api.get(`/api/reports/usage?${params.toString()}`)
      setData(data)
    } catch (e) {
      setErr(e?.response?.data?.error || 'Failed to run report')
    }
  }

  useEffect(() => { run() }, [])

  return (
    <div>
      <h2>Usage Report</h2>
      <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:12}}>
        <label>From <input type="date" value={from} onChange={e=>setFrom(e.target.value)} /></label>
        <label>To <input type="date" value={to} onChange={e=>setTo(e.target.value)} /></label>
        <button onClick={run}>Run</button>
      </div>
      {err && <div style={{color:'crimson'}}>{err}</div>}
      {data && (
        <pre style={{background:'#f6f6f6', padding:12, border:'1px solid #ddd'}}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}
