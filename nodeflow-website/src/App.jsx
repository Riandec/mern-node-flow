import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MessageProvider } from './context/Message'
import './App.css'
import Navbar from './components/Navbar'
import Input from './components/Input'
import Line from './components/Line'
import Facebook from './components/Facebook'
import Discord from './components/Discord'
import Output from './components/Output'

function App() {

  return (
    <MessageProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/line" element={<Line />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </div>
    </MessageProvider>
  )
}

export default App
