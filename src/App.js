import Auth from './components/Auth'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SocketProvider } from './context/SocketProvider';
import { ContactsProvider } from './context/ContactsProvider';
import { ConversationsProvider } from './context/ConversationsProvider';
import Dashboard from './components/Dashboard';
import { useApp } from './context/AppProvider';
import Loading from './components/Loading';

function App() {

  const { id } = useApp()
  const [loading, setLoading] = useState(false)

  if(!id) {
    return (
      <Auth />
    )
  }

  const connectServer = async () => {
    try {
      setLoading(true)
      await axios.get('https://kata-realtimechatapp-be.onrender.com')  
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if(id) {
      connectServer()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SocketProvider>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            {loading && <Loading/>}
            <Dashboard/>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </>
  );
}

export default App;
