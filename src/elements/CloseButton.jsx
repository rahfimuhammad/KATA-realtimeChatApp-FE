import React from 'react'
import { X } from 'phosphor-react'

const CloseButton = ({ handleEdit }) => {

  return (
    <div 
      style={{width: "30px",
              height: "30px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              backgroundColor: "#FF5050"}}
          onClick={() => handleEdit()} 
      >
      <X color='white' size={17} />
    </div>
  )
}

export default CloseButton