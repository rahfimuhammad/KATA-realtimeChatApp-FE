import React from 'react'
import '../App.css';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import WelcomeChat from '../components/WelcomeChat';
import { useConversations } from '../context/ConversationsProvider';
import { useApp } from '../context/AppProvider';
import DialogueBox from '../fragments/DialogueBox';
import AddContact from '../fragments/AddContact'

const Dashboard = () => {

  const { dialogueBox, addContact, setAddContact } = useApp()
  const { selectedConversationId } = useConversations()

  return (
    <div className='app-container'>
        {dialogueBox && <DialogueBox/>}
        <Sidebar/>
        {selectedConversationId
        ? (<Main/>)
        : (<WelcomeChat/>)
        }
        {addContact && <AddContact setAddContact={setAddContact} type="Add Contact" />}
    </div>
  )
}

export default Dashboard