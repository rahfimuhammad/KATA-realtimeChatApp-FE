import React, { useContext, useEffect, useCallback } from "react";
import { useApp } from "./AppProvider";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactsContext = React.createContext()

export const useContacts = () => {
    return useContext(ContactsContext)
}

export const ContactsProvider = ({children}) => {

    const [contacts, setContacts] = useLocalStorage('contacts', [])
    const { id, setAddContact } = useApp()
    const notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

    const getContact = useCallback(async () => {
        try {
          const response = await axios.get(`https://kata-server-e0c6f72de554.herokuapp.com/contact/${id}`)
          setContacts(response?.data)
        } catch (error) {
          console.log(error.message)
        }
    }, [id, setContacts])
    
    useEffect(() => {
        getContact()
    }, [getContact])

    const addToContact = async (recipientId) => {
        try {      
            const response = await axios.post('https://kata-server-e0c6f72de554.herokuapp.com/contact', {
                userId: id,
                recipientId: recipientId
            });
            notifySuccess(response?.data?.message);
            getContact();
        } catch (error) {
            notifyError("Contact already exists");
        } finally {
            setTimeout(() => {
                setAddContact(prevData => !prevData);
            }, 2000);
        }
    };
    

    const value = {
        contacts: contacts,
        setContacts: setContacts,
        addToContact: addToContact
    }

return (
    <ContactsContext.Provider value={value}>
        {children}
    </ContactsContext.Provider>
)
}

