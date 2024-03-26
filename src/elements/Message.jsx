import React, { useCallback } from 'react'
import MessageStatus from './MessageStatus'
import { TrashSimple } from 'phosphor-react'
import { useConversations } from '../context/ConversationsProvider'
import { formattedTime, getMessageDate, formattedTimeChatList } from '../function/useFormattedTime'
import { useApp } from '../context/AppProvider'
import Dummy from '../assets/dummy.png'

const Message = ({ deleteButton, lastMessage, message, index, avatar }) => {

    const { selectedConversation, deleteMessage } = useConversations()
    const { profile } = useApp()
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const handleDelete = (messageId) => {
        if (deleteButton) {
            deleteMessage(selectedConversation.recipients[0]?.id, messageId);
        }
    };

  return (
        <div className={`bubble-chat-wrapper ${message.fromMe? 'owner' : ''}`}  
            key={index} 
            ref= {lastMessage? setRef: null}>
                {(index === 0 || getMessageDate(message?.createdAt, selectedConversation.message[index - 1]?.createdAt)) &&
                <div style={{width: "100%", 
                             display: "flex", 
                             padding: "3px 0",
                             justifyContent: "center"}}>
                    <span style={{backgroundColor: "#6f6f6f", 
                                  padding: "8px", 
                                  fontSize: "13px", 
                                  borderRadius: "5px"}}>
                        <p style={{fontSize: "13px"}}>{formattedTimeChatList(message.createdAt)}</p>
                    </span>
                </div>}
                <div className="bubble-chat" style={{flexDirection: message.fromMe? 'row-reverse' : 'row', 
                                                     position: "relative" }}>
                    {(index === 0 
                    || message?.sender !== selectedConversation?.messages[index - 1]?.sender 
                    || getMessageDate(message?.createdAt, selectedConversation.message[index - 1]?.createdAt)) 
                    && <img style={{width: "30px", 
                                    height: "30px", 
                                    borderRadius: "50%", 
                                    objectFit: "cover", 
                                    position: "absolute", 
                                    top: "0"}}
                                    src={!message.fromMe? (avatar || Dummy) : profile?.avatarURL} 
                                    alt="profile" 
                    />}
                    <div className={`message-container ${message.fromMe? 'me' : ''}`} style={{marginLeft: message.fromMe? '0' : '35px', 
                                                                                              marginRight: message.fromMe? '35px' : '0' }}>
                        <p>{message.text}</p>
                        <div className='time-container'>
                            <span style={{fontSize: '12px'}}>{formattedTime(message.createdAt)}</span>
                        </div>
                        {message.fromMe && <MessageStatus messageStatus={message?.status}/>}
                    </div>
                    {deleteButton &&
                    <button style={{backgroundColor: "#FF5050", 
                                    padding: "3px", 
                                    border: "none", 
                                    display: "flex", 
                                    cursor: "pointer",
                                    justifyContent: "center", 
                                    alignItems: "center", 
                                    borderRadius: "5px"}} 
                            onClick={() => handleDelete(message?.messageId)}
                            className='delete-message-button'
                    >
                        <TrashSimple size={20} color="white" />
                    </button>
                    }
            </div>
        </div>
  )
}

export default Message