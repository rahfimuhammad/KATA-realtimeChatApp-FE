import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import { arrayEquality } from "../function/useArray";
import { v4 as uuidV4 } from 'uuid';

const ConversationsContext = React.createContext()

export const useConversations = () => {
    return useContext(ConversationsContext)
}

export const ConversationsProvider = ({ id, children }) => {

    const [selectedConversationId, setSelectedConversationId] = useState(null)
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const {contacts} = useContacts()
    const { socket } = useSocket()

    const createConversation = (recipients) => {

        const existingConversation = conversations.find(conversation =>
            arrayEquality(conversation.recipients, recipients)
        );
        
        if (existingConversation) {
            return existingConversation;
        } else {
            const newConversation = { id: uuidV4(), recipients, message: [] };
                setConversations(prevConversations => [...prevConversations, newConversation]);
                return newConversation;
            }
        };
        
    const addMessageToConversation = useCallback(({ messageId, recipients, text, sender, status }) => {
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = { messageId, createdAt: new Date(), sender, text, status };
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return { ...conversation, message: [...conversation.message, newMessage] }
                }

                return conversation;
            })

            if (madeChange) {
                return newConversations;
            } else {
                return [...prevConversations, { recipients, message: [newMessage] }]
            }
        })
    }, [setConversations]);

    useEffect(() => {
        if(socket == null) return

        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message')

    }, [socket, addMessageToConversation])

    useEffect(() => {
        if (socket == null) return;
    
        socket.on('message-sent', messageId => {
            setConversations(prevConversations => {
                const updatedConversations = prevConversations.map(conversation => {
                    const updatedMessages = conversation.message.map(message => {
                        if (message.messageId === messageId) {
                            return { ...message, status: 'sent' };
                        }
                        return message;
                    });
                    return { ...conversation, message: updatedMessages };
                });
                return updatedConversations;
            });
        });
    
        return () => socket.off('message-sent');
    }, [socket, setConversations]);

    const sendMessage = (recipients, text) => {

        const messageId = uuidV4()

        socket?.emit('send-message', {messageId, recipients, text})

        addMessageToConversation({messageId, recipients, text, sender: id, status: 'sending'})
    }

    const formattedConversations = conversations.map((conversation) => {

        const recipients = conversation.recipients?.map(recipient => {

            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
    
            const name = (contact && contact.name) || recipient
                return { id: recipient, name}
            })

            const messages = conversation.message?.map(message => {
                const contact = contacts.find(contact => {
                    return contact.id === message.sender
                })
                const name = (contact && contact.name) || message.sender
                const fromMe = id === message.sender
                
                return {...message, senderName: name, fromMe}
            })

            const selected = conversation.id === selectedConversationId

        return {...conversation, messages, recipients, selected}
    })
    
    const selectedConversation = formattedConversations.find(conversation => {
            return conversation.recipients[0]?.id === selectedConversationId
        })

    const deleteMessage = (recipientId, messageId) => {
        setConversations(prevConversations => {
            const newConversations = [...prevConversations];
            const conversationToDelete = newConversations.find(conversation => conversation?.recipients[0] === recipientId);
    
            if (conversationToDelete) {
                conversationToDelete.message = conversationToDelete.message?.filter(msg => msg.messageId !== messageId);
    
                if (conversationToDelete.message?.length === 0) {
                    setSelectedConversationId(null)
                    return newConversations.filter(conversation => conversation?.recipients[0] !== recipientId);
                }
            }
            return newConversations;
        });
    };

    const deleteConversation = (conversationId) => {
        setConversations(prevConversations => {
            const remainConversation = prevConversations.filter(conversation => conversation?.id !== conversationId)
            return remainConversation
        })
        setSelectedConversationId(null)
    }
    

const value = {
    conversations: formattedConversations,
    selectedConversation: selectedConversation,
    selectedConversationId: selectedConversationId,
    setConversations: setConversations,
    setSelectedConversationId: setSelectedConversationId,
    createConversation,
    deleteMessage,
    sendMessage,
    deleteConversation
}

return (
    <ConversationsContext.Provider value={value}>
        {children}
    </ConversationsContext.Provider>
    )
} 