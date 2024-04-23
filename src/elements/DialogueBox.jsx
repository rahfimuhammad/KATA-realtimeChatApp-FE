import React from 'react'
import { useConversations } from '../context/ConversationsProvider'

const DialogueBox = ({ type, onClose }) => {

    const { deleteConversation, selectedConversation } = useConversations()

    const clearLocalStorage = () => {
      localStorage.clear();
      window.location.reload()
    };

    const handleDialogue = () => {
      if(type === 'Delete Conversation') {
        deleteConversation(selectedConversation?.id)
      } else {
        clearLocalStorage()
      }
      onClose()
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
              alignItems: "center"}}
    >
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
            <p 
              style={{width: "90%", 
                      textAlign: "center"}}
            >
                {type === 'Delete Conversation'
                ? "Are you sure want to delete this conversation?"
                : "Are you sure want to logout?"}
            </p>
            <div className="button-container">
                <button 
                    style={{backgroundColor: "#4b9b6b", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center"}} 
                            onClick={handleDialogue}
                >
                  Continue
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
    </div>
  )
}

export default DialogueBox