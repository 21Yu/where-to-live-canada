import { useState } from 'react'
import Chart from './components/Chart';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Chart />
    </>
  )
}

export default App
