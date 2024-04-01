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
            , { query: {id} })

        newSocket.on('connect', () => {
            setSocket(newSocket)
            setConnectionError(false)
        })

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