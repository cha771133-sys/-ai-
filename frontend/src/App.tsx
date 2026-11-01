import { useState } from 'react'
import axios from 'axios'
import { api } from './lib/api'

type ConnectionState = 'idle' | 'loading' | 'success' | 'error'

function App() {
  const [state, setState] = useState<ConnectionState>('idle')
  const [message, setMessage] = useState('')

  async function checkConnection() {
    setState('loading')
    setMessage('')

    try {
      const { data } = await api.get<{ status: string }>('/api/health/')
      setState('success')
      setMessage(data.status)
    } catch (error) {
      setState('error')
      setMessage(axios.isAxiosError(error) ? error.message : '알 수 없는 오류')
    }
  }

  return (
    <main>
      <h1>ChungnamOn</h1>
      <button type="button" onClick={checkConnection} disabled={state === 'loading'}>
        서버 연결 확인
      </button>
      <p role="status">
        {state === 'loading' && '확인 중...'}
        {state === 'success' && `연결 성공: ${message}`}
        {state === 'error' && `연결 실패: ${message}`}
      </p>
    </main>
  )
}

export default App
