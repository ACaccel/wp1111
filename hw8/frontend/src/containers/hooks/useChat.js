import { createContext, useContext, useState, useEffect } from "react";
import { message } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_CHATBOX_MUTATION,
         CREATE_MESSAGE_MUTATION } from '../../graphql';

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
  me: '',
  setMe: () => {},
  signedIn: false,
  setSignedIn: () => {},
  startChat: () => {},
  sendMessage: () => {},
  // clearMessages: () => {},
  displayStatus: () => {}
});

const ChatProvider = (props) => {
  const [me, setMe] = useState(savedMe || '');
  const [signedIn, setSignedIn] = useState(false);

/*-------------graphql connection------------------*/
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
/*----------------------------------------------*/

  const displayStatus = ({ type, msg }) => {
    if(msg) {
      const content = {
        content: msg,
        duration: 0.5
      };
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);
  return (
    <ChatContext.Provider
      value={{
        me, 
        setMe, 
        signedIn, 
        setSignedIn,
        startChat, 
        sendMessage, 
        // clearMessages, 
        displayStatus,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };