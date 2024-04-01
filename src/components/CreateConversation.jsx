import React, { useEffect, useState } from 'react'
import { useContacts } from '../context/ContactsProvider'
import { useApp } from '../context/AppProvider'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import CloseButton from '../elements/CloseButton'
import ContactItem from '../elements/ContactItem'

const CreateConversation = () => {
  const { contacts } = useContacts()
  const { setIsEditing, setAddContact } = useApp()
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleEdit = () => {
    setIsEditing(false)
  }

  useEffect(() => {
    const searchContact = () => {
      const results = contacts.filter(contact =>
        contact.recipient?.name.toLowerCase().includes(search.toLowerCase())
      )
      setSearchResults(results)
    }

    searchContact()
  }, [search, contacts])

  return (
    <div className='sidebar-content'>
      <div className="search-input">
            <MagnifyingGlass size={20} />
            <input 
                  type="text" 
                  placeholder='Search' 
                  onChange={(e) => setSearch(e.target.value)} 
            />
      </div>
      <div className="sidebar-content-header">
        <h4>Contacts</h4>
        <div 
          style={{display: "flex", 
                  gap: "10px"}}
        >
          <div 
            className='btn-circle' 
            onClick={() => setAddContact(true)}
          >
            <Plus size={20} color='white'/>
          </div>
          <CloseButton handleEdit={handleEdit}/>
        </div>
      </div>
        <div className='sidebar-content-list'>
        {!contacts.length
            ? (<div 
                  style={{width: "100%", 
                          display: "flex", 
                          justifyContent: "center"}}
                >
                <span>
                    No contact yet
                </span>
            </div>) :
          searchResults.length > 0 ? (
            searchResults.map((contact) => (
              <ContactItem 
                        key={contact.id} 
                        contact={contact}
              />
              ))
            ) 
          : (
            contacts.map((contact) => (
              <ContactItem 
                        key={contact.id} 
                        contact={contact}
              />
              ))
            )
        }
        </div>
    </div>
  )
}

export default CreateConversation
