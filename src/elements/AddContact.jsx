import React, { useState } from 'react'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationsProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner'

const AddContact = ({ type, onClose }) => {

    const { selectedConversation } = useConversations()
    const recipientId = selectedConversation?.recipients[0]?.id
    const { addToContact } = useContacts()
    const [contactData, setContactData] = useState(recipientId ? recipientId : "")
    const { loading } = useContacts()

    const submitContact = async () => {
            await addToContact(contactData)
            setTimeout(() => {
                onClose();
            }, 2000);
    }

    return (
        <div  
            style={{position: "absolute",
                    zIndex: "11",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    // height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}}>
            <div 
                onClick={() => onClose()}
                style={{width: "100%",
                        height: "100%",
                        border: "none",
                        backgroundColor: "rgba(33, 33, 33, .6)",
                        position: "absolute",
                        top: "0",
                        left: "0"}}></div>
            <div className="add-contact">
                <h4>{type}</h4>
                <form action="submit">
                    <input 
                        value={contactData} 
                        onChange={(e) => setContactData(e.target.value)} 
                        type="text" 
                        placeholder='Phone Number' 
                    />
                </form>
                <div className="button-container">
                    <button 
                        style={{backgroundColor: "#4b9b6b", 
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center"}} 
                        onClick={submitContact}
                    >
                        {loading? <Spinner size={23}/> : "Save"}
                    </button>
                    <button 
                        style={{backgroundColor: "#FF5050", 
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center"}} 
                        onClick={() => onClose()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddContact