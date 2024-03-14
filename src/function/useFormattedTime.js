export const formattedTime = (time) => {
    
    const messageDate = new Date(time)
    const hours = messageDate?.getHours().toString().padStart(2, '0');
    const minutes = messageDate?.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`
}

export const formattedTimeChatList = (time) => {
    
    const now = new Date()
    const messageDate = new Date(time)
    const hours = messageDate?.getHours().toString().padStart(2, '0');
    const minutes = messageDate?.getMinutes().toString().padStart(2, '0');
    const day = messageDate?.getDate().toString();
    const month = (messageDate?.getMonth() + 1).toString();
    const year = messageDate?.getFullYear().toString();

    if(now.getFullYear() === messageDate?.getFullYear() &&
       now.getMonth() === messageDate?.getMonth() &&
       now.getDate() === messageDate?.getDate() ) {
        
        return `Today at ${hours}:${minutes}`
    } else {
        return `${day}/${month}/${year}`
    }
}

export const getMessageDate = (message, prevMessage) => {
    const messageDate = new Date(message);
    const prevMessageDate = new Date(prevMessage);
    
    const isSameDate = (date1, date2) => {
        return (
            date1.getFullYear() !== date2.getFullYear() ||
            date1.getMonth() !== date2.getMonth() ||
            date1.getDate() !== date2.getDate()
        );
    };
        return isSameDate(messageDate, prevMessageDate);
};