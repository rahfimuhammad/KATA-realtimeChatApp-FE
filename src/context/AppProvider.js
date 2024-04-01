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
    const [logoutModal, setLogoutModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [addContact, setAddContact] = useState(false)
    const [contactInfo, setContactInfo] = useState(false)


    const value = {
        isEditing,
        setIsEditing,
        toggle,
        setToggle,
        id,
        setId,
        profile,
        setProfile,
        deleteModal,
        setDeleteModal,
        logoutModal,
        setLogoutModal,
        addContact,
        setAddContact,
        contactInfo,
        setContactInfo
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}