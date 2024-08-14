import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import axios from 'axios';

const App:React.FC = () => {
const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/start-session');
        const { session_id } = response.data;
        setSessionId(session_id);
        console.log('Session ID:', session_id);
      } catch (error) {
        console.error('Error starting session:', error);
      }
    };

    startSession();
  }, []);
  return (
    <div className="flex flex-col w-[100%] h-[100vh]">
      <Navbar></Navbar>
      <Hero session_id = {sessionId}/>
    </div>
  )
}

export default App
