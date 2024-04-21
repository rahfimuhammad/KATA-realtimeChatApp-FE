import { useState, useEffect } from "react";

export const useViewportDetect = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(null);
    const [onKeyboardAvoid, setOnKeyboardAvoid] = useState(null)

    useEffect(() => {
        const handleResize = () => {

            setKeyboardHeight(window.innerHeight - window.visualViewport.height)
            setOnKeyboardAvoid(window.innerHeight - keyboardHeight)
            
            window.addEventListener("resize", handleResize);
        };
        handleResize()
        window.scrollTo(0, 0)
        
    }, []);

    return {
        keyboardHeight,
        onKeyboardAvoid
    }
}