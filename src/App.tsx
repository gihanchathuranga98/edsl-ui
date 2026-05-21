import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router'
import Router from './router'
import { AuthContext } from './contexts/auth.context'
import { message } from 'antd'
import './services/token.service';

function App() {

  const [user, setUser] = useState();
  const [permissions, setPermissions] = useState<string[]>([]);

  const [showAlert, alertContext] = message.useMessage();

  return (
    <>
      {alertContext}
      <AuthContext.Provider value={{ user, permissions, setPermissions, setUser, showAlert }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
