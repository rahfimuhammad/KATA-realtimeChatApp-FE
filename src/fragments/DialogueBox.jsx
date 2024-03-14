import React from 'react'
import { useConversations } from '../context/ConversationsProvider'
import { useApp } from '../context/AppProvider'

const DialogueBox = ({ type }) => {

    const { deleteConversation, selectedConversation } = useConversations()
    const { setDialogueBox } = useApp()

    const clearLocalStorage = () => {
      localStorage.clear();
      window.location.reload()
    };

    const handleDialogue = () => {
      if(type === 'endchat') {
        deleteConversation(selectedConversation?.id)
      } else {
        clearLocalStorage()
      }
      setDialogueBox(false)
    }
    
  return (
    <div style={{position: "absolute",
                 zIndex: "11",
                 top: "0",
                 left: "0",
                 width: "100%",
                 height: "100vh",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center"}}>
        <div onClick={() => setDialogueBox(false)}
             style={{width: "100%",
                     height: "100%",
                     border: "none",
                     backgroundColor: "rgba(33, 33, 33, .6)",
                     position: "absolute",
                     top: "0",
                     left: "0"}}></div>
        <div className="add-contact">
            <h4>{type === 'endchat' ? "Delete Conversation" : "Logout"}</h4>
            <p style={{width: "90%", textAlign: "center"}}>
                {type === 'endchat'
                ? "Are you sure want to delete this conversation?"
                : "Are you sure want to logout?"}
            </p>
            <div className="button-container">
                <button style={{backgroundColor: "#4b9b6b"}} onClick={handleDialogue}>Continue</button>
                <button style={{backgroundColor: "#FF5050"}} onClick={() => setDialogueBox(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DialogueBox