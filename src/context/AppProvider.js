import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = React.createContext()

export const useApp = () => {
    return useContext(AppContext)
}

export const AppProvider = ({ children }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [id, setId] = useLocalStorage('id')
    const [profile, setProfile] = useLocalStorage('profile', {})
    const [dialogueBox, setDialogueBox] = useState(false)
    const [addContact, setAddContact] = useState(false)


    const value = {
        isEditing: isEditing,
        setIsEditing: setIsEditing,
        toggle: toggle,
        setToggle: setToggle,
        id: id,
        setId: setId,
        profile: profile,
        setProfile: setProfile,
        dialogueBox: dialogueBox,
        setDialogueBox: setDialogueBox,
        addContact: addContact,
        setAddContact: setAddContact
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}