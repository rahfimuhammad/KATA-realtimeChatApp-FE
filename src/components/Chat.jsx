import React, { useState, useRef, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'
import { useContacts } from '../context/ContactsProvider'
import { useApp } from '../context/AppProvider'
import { PaperPlaneRight, DotsThreeOutline, X, SmileyWink } from 'phosphor-react'
import { useConversations } from '../context/ConversationsProvider'
import { useViewportDetect } from '../hooks/useViewportDetect'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Message from '../elements/Message'
import AddContact from '../elements/AddContact'
import DialogueBox from '../elements/DialogueBox'

const Chat = () => {

    const [text, setText] = useState("")
    const [emoji, setEmoji] = useState(false)
    const [option, setOption] = useState(false)
    const [deleteButton, setDeleteButton] = useState()
    const { sendMessage, selectedConversation } = useConversations()
    const { connectionError } = useSocket()
    const { contacts } = useContacts()
    const { toggle, setToggle, deleteModal, setDeleteModal, contactInfo, setContactInfo } = useApp()
    const { onKeyboardAvoid, keyboardHeight } = useViewportDetect()
    const inputRef = useRef(null);
    const contactData = contacts.find((contact) => {
        return contact?.recipientId === selectedConversation.recipients[0]?.id
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(r => r.id),
        text)

        setText('')
        // inputRef.current.focus();
    }

    const closeOption = () => {
        if(option || toggle) {
            setOption(false)
            setToggle(false)
        }
    }

    useEffect(() => {
        const closeEmoji = () => {
            if(onKeyboardAvoid || keyboardHeight) setEmoji(false)
        }

        closeEmoji()
    }, [onKeyboardAvoid, keyboardHeight])

    const handleAddText = (textToSend) => {
        setText(textToSend)
    }

    const handleEmoji = (emoji) => {
        setText(prevState => prevState + emoji)
    }

    const emojiAppear = () => {
        setTimeout(() => {
            setEmoji(!emoji)
        }, 200)
    }

    return (
        <div 
            className='main-container' 
            style={{height: (onKeyboardAvoid || keyboardHeight) ? `${onKeyboardAvoid}px` : "100vh"}}>
            <div 
                className='chat-container'
                style={{height: (onKeyboardAvoid || keyboardHeight) ? `${onKeyboardAvoid}px` : "100vh"}} 
                onClick={closeOption}>
                {connectionError && <div className='no-connection'>
                    <p style={{color: "white"}}>
                        No Connection
                    </p>
                </div>
                }
                {contactInfo && <AddContact 
                                        type="Contact" 
                                        onClose={() => setContactInfo(false)}
                                />
                }
                {deleteModal && <DialogueBox 
                                        type='Delete Conversation' 
                                        onClose={() => setDeleteModal(false)}
                                />
                }
                <div className="chat-header">
                    <div className="chat-header-left">
                        <img 
                            style={{width: "40px", 
                                    height: "40px", 
                                    borderRadius: "50%", 
                                    objectFit: "cover"}}
                            src={contactData?.recipient?.avatarURL || '/assets/dummy.png'} 
                            alt="profile" 
                        />
                        <p style={{fontWeight: "bold"}}>
                            {contactData?.recipient?.name || selectedConversation?.recipients[0]?.id}
                        </p>
                    </div>
                    <div 
                        className="chat-header-right" 
                        onClick={() => {setOption(!option); setDeleteButton(false)}}
                    >
                        <DotsThreeOutline size={30} />
                    </div>
                    {option &&
                    <div 
                        style={{width: "200px", 
                                height: "fit-content",
                                position: "absolute",
                                padding: "5px 0",
                                borderRadius: "5px",
                                border: "#cccccc 1px solid",
                                right: "10px",
                                zIndex: "7",
                                top: "40px", 
                                backgroundColor: "aliceblue", 
                                display: "flex", 
                                flexDirection: "column"}}
                    >
                        <div className='chat-option' onClick={() => setContactInfo(true)}>
                            <p>Contact</p>
                        </div>
                        <div className='chat-option' onClick={() => setDeleteButton(!deleteButton)}>
                            <p>Delete Message</p>
                        </div>
                        <div className='chat-option' onClick={() => setDeleteModal(true)}>
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
                <div 
                    className="chat-content" 
                    style={{height: (onKeyboardAvoid || keyboardHeight) ? `${window.innerHeight - keyboardHeight - 120}px` : "calc(100vh - 120px)" }}>
                    <div className="bubble-chat-container">
                        {selectedConversation.messages?.map((message, index) => {
                        const lastMessage = selectedConversation.message.length - 1 === index
                        return (
                            <Message 
                                key={index}
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
                <div className="chat-input" style={{position: "relative"}}>
                    <form 
                        action="sumbit" 
                    >
                        <div
                            className='emoji-button' 
                            onClick={() => emojiAppear()}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <SmileyWink size={32} color='#6f6f6f' />
                        </div>
                        <input
                            className='chat-input-field' 
                            ref={inputRef}
                            type="text" 
                            placeholder='type message' 
                            value={text} onChange={e => handleAddText(e.target.value)}
                        />
                        {
                        emoji && 
                        <span
                            style={{
                                backgroundColor: "aliceblue",
                                position: "absolute", 
                                bottom: "70px", 
                                right: "10px", 
                                zIndex: "9"
                            }}
                        >
                            <Picker 
                                data={data} 
                                onEmojiSelect={emoji => handleEmoji(emoji.native)}
                                perLine={7}
                                theme='light'
                                onClickOutside={() => setEmoji(!emoji)}    
                            />
                        </span>
                        }
                        <button className='send-button' disabled={!text || connectionError} onClick={(e) => handleSubmit(e)}>
                            <PaperPlaneRight color='white' size={22} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat