import React, { useState } from 'react'
import { PaperPlaneRight, DotsThreeOutline, X } from 'phosphor-react'
import { useConversations } from '../context/ConversationsProvider'
import Message from '../elements/Message'
import AddContact from '../elements/AddContact'
import DialogueBox from '../elements/DialogueBox'
import Dummy from '../assets/dummy.png'
import { useSocket } from '../context/SocketProvider'
import { useContacts } from '../context/ContactsProvider'
import { useApp } from '../context/AppProvider'

const Chat = () => {

    const [text, setText] = useState("")
    const [option, setOption] = useState(false)
    const [deleteButton, setDeleteButton] = useState()
    const { sendMessage, selectedConversation } = useConversations()
    const { connectionError } = useSocket()
    const { contacts } = useContacts()
    const { toggle, setToggle, dialogueBox, setDialogueBox, addContact, setAddContact } = useApp()

    const contactData = contacts.find((contact) => {
        return contact?.recipientId === selectedConversation.recipients[0]?.id
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(r => r.id),
        text)

        setText('')
    }

    const closeOption = () => {
        if(option || toggle) {
            setOption(false)
            setToggle(false)
        }
    }

  return (
    <div className='chat-container' onClick={closeOption}>
        {connectionError && <div className='no-connection'>
           <p style={{color: "white"}}>
            No Connection
           </p>
        </div>}
        {addContact && <AddContact type="Contact"/>}
        {dialogueBox && <DialogueBox setDialogueBox={setDialogueBox} type='endchat'/>}
        <div className="chat-header">
            <div className="chat-header-left">
                <img style={{width: "40px", 
                             height: "40px", 
                             borderRadius: "50%", 
                             objectFit: "cover"}}
                    src={contactData?.recipient?.avatarURL || Dummy} 
                    alt="profile" 
                />
                <p style={{fontWeight: "bold"}}>
                    {contactData?.recipient?.name || selectedConversation?.recipients[0]?.id}
                </p>
            </div>
            <div className="chat-header-right" onClick={() => {setOption(!option); setDeleteButton(false)}}>
                <DotsThreeOutline size={30} />
            </div>
            {option &&
            <div style={{width: "200px", 
                         height: "fit-content",
                         position: "absolute",
                         padding: "5px 0",
                         borderRadius: "5px",
                         border: "#cccccc 1px solid",
                         right: "10px",
                         zIndex: "3",
                         top: "40px", 
                         backgroundColor: "aliceblue", 
                         display: "flex", 
                         flexDirection: "column"}}>
                <div className='chat-option' onClick={() => setAddContact(!addContact)}>
                    <p>Contact</p>
                </div>
                <div className='chat-option' onClick={() => setDeleteButton(!deleteButton)}>
                    <p>Delete Message</p>
                </div>
                <div className='chat-option' onClick={() => setDialogueBox(!dialogueBox)}>
                    <p>Delete Conversation</p>
                </div>
            </div>
            }
            {deleteButton &&
                <div className='close-delete' onClick={() => setDeleteButton(false)}>
                <X size={20} color='white'/>
            </div>
            }
        </div>
        <div className="chat-content">
            <div className="bubble-chat-container">
                {selectedConversation.messages?.map((message, index) => {
                const lastMessage = selectedConversation.message.length - 1 === index
                return (
                    <Message key={index}
                             deleteButton={deleteButton} 
                             lastMessage={lastMessage} 
                             message={message} 
                             index={index}
                             avatar={contactData?.recipient?.avatarURL}
                    />
                    )}
                )}
            </div>
        </div>
        <div className="chat-input">
            <form action="sumbit" onSubmit={handleSubmit}>
                <input type="text" placeholder='type message' value={text} onChange={e => setText(e.target.value)}/>
                <button className='send-button'>
                    <PaperPlaneRight color='white' size={22} />
                </button>
            </form>
        </div>
    </div>
  )
}

export default Chat