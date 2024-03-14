import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useApp } from './AppProvider'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState()
    const [connectionError, setConnectionError] = useState(false)
    const { id } = useApp()

    useEffect(() => {
        const newSocket = io(
            'https://kata-server-e0c6f72de554.herokuapp.com/'
            // 'http://localhost:5000'
            // 'https://new-reality-server-c7e0e1ab0eee.herokuapp.com/'
            , { query: {id} })

        newSocket.on('connect', () => {
            setSocket(newSocket)
            setConnectionError(false)
        })

        newSocket.on('connect_error', () => {
            setConnectionError(true)
        })

        // newSocket.on('message-sent', (status) => {
        //     console.log('Message sent status:', status);
        // })

        return () => {
            newSocket.close()
        }
    }, [id])

    const value = {
        socket: socket,
        connectionError: connectionError
    }

    return  (
    
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>

    )
} 