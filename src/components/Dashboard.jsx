import React from 'react'
import { useConversations } from '../context/ConversationsProvider';
import { useApp } from '../context/AppProvider';
import { useViewportDetect } from '../hooks/useViewportDetect'
import '../App.css';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import WelcomeChat from '../components/WelcomeChat';
import DialogueBox from '../elements/DialogueBox';
import AddContact from '../elements/AddContact'

const Dashboard = () => {

  const { logoutModal, setLogoutModal, addContact, setAddContact } = useApp()
  const { selectedConversationId } = useConversations()
  const { onKeyboardAvoid, keyboardHeight } = useViewportDetect()


  return (
    <div 
      className='app-container'
      style={{height: (onKeyboardAvoid || keyboardHeight) ? `${onKeyboardAvoid}px` : "100vh"}}
      >
        <Sidebar/>
        {
        selectedConversationId
        ? (<Chat/>)
        : (<WelcomeChat/>)
        }
        {addContact && <AddContact 
                                onClose={() => setAddContact(false)} 
                                type="Add Contact" 
                        />
        }
        {logoutModal && <DialogueBox 
                                onClose={() => setLogoutModal(false)} 
                                type='Logout'
                        />
        }
    </div>
  )
}

export default Dashboard