import React from 'react'
import '../App.css';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import WelcomeChat from '../components/WelcomeChat';
import { useConversations } from '../context/ConversationsProvider';
import { useApp } from '../context/AppProvider';
import DialogueBox from '../elements/DialogueBox';
import AddContact from '../elements/AddContact'

const Dashboard = () => {

  const { logoutModal, setLogoutModal, addContact, setAddContact } = useApp()
  const { selectedConversationId } = useConversations()

  return (
    <div className='app-container'>
        <Sidebar/>
        {
        selectedConversationId
        ? (<Main/>)
        : (<WelcomeChat/>)
        }
        {addContact && <AddContact onClose={() => setAddContact(false)} type="Add Contact" />}
        {logoutModal && <DialogueBox onClose={() => setLogoutModal(false)} type='Logout'/>}
    </div>
  )
}

export default Dashboard