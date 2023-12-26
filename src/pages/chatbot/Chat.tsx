import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)

  const toggleChat = () => {
    if(userLoginData){
    setIsChatOpen(!isChatOpen);
    }else{
      toast.error('you not login', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
   
      <>
    
      <button className="chat-button" onClick={toggleChat}>
      <Icon icon="mingcute:chat-4-line" />
      </button>

 
      { isChatOpen && <ChatWindow onClose={toggleChat} />}
      </>


  );
};
export default Chat
