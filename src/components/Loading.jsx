import React from 'react'
import Spinner from '../elements/Spinner'

const Loading = () => {
    return (
        <div
            style={{
                position: "absolute",
                zIndex: "11",
                top: "0",
                left: "0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}  
        >
            <Spinner size={30}/>
        </div>
    )
}

export default Loading