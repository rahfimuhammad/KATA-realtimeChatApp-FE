import Auth from './components/Auth'
import { SocketProvider } from './context/SocketProvider';
import { ContactsProvider } from './context/ContactsProvider';
import { ConversationsProvider } from './context/ConversationsProvider';
import Dashboard from './components/Dashboard';
import { useApp } from './context/AppProvider';

function App() {

  const { id } = useApp()

  if(!id) {
    return (
      <Auth />
    )
  }

  return (
    <>
      <SocketProvider>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard/>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </>
  );
}

export default App;
