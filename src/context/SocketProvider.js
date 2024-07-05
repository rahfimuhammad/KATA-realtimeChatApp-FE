import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useApp } from './AppProvider'


// Setting up SocketContext
const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    
    const [socket, setSocket] = useState()
    const [connectionError, setConnectionError] = useState(false)
    const { id } = useApp()

    // Setting up Socket
    useEffect(() => {
        const newSocket = io(
            'https://kata-realtimechatapp-be.onrender.com'
            , { query: {id} })

        // Socket Connection
        newSocket.on('connect', () => {
            setSocket(newSocket)
            setConnectionError(false)
        })

        // Socket Disconnection
        newSocket.on('connect_error', () => {
            setConnectionError(true)
        })

        return () => {
            newSocket.close()
        }
    }, [id])

    const value = {
        socket,
        connectionError
    }

    return  (
    
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>

    )
} 