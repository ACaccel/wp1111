import { createContext, useContext, useState, useEffect } from "react";
import { message } from 'antd';

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
  status: {},
  me: '',
  signedIn: false,
  messages: [],
  startChat: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
  getChat: false,
  setGetChat: () => {}
});

const client = new WebSocket('ws://localhost:4000');
client.onopen = () => console.log('Backend socket server connected!');

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || '');
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [getChat, setGetChat] = useState(false);

  client.onmessage = (byteString) => {
    const { type, payload } = JSON.parse(byteString.data);
    console.log('useChat onmessage:\n', 'type:', type, 'payload:', payload)

    switch (type) {
      case 'CHAT': {
        setMessages(() => ([...payload]));
        setGetChat(true);
        displayStatus({
          type: 'success',
          msg: 'chat init success!'
        })
        break;
      }
      case 'MESSAGE': {
        setMessages(() => ([...messages, payload]));
        displayStatus({
          type: 'success',
          msg: 'message send success!'
        })
        break;
      }
      case 'CLEAR': {
        setMessages(() => ([payload]));
        displayStatus({
          type: 'success',
          msg: 'message clear success!'
        })
        break;
      }
      default:break;
    }
  }

  const clearMessages = () => {
    sendData({
      type: 'CLEAR',
      payload: {}
    });
    console.log('messages cleared')
  }

  const startChat = (name, to) => {
    if (!name || !to) throw new Error('Name or to required.');
    sendData({
      type: 'CHAT',
      payload: { name, to }
    });
    console.log('useChat startChat:', name, to)
  }

  const sendMessage = ({ name, to, body }) => {
    if (!name || !to | !body) throw new Error('name or to or body required.');
    sendData({
      type: 'MESSAGE',
      payload: { name, to, body }
    });
  };

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };

  const displayStatus = (s) => {
    if(s.msg) {
      const { type, msg } = s;
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
        status, 
        me, 
        setMe, 
        signedIn, 
        setSignedIn, 
        messages, 
        startChat, 
        sendMessage, 
        clearMessages, 
        displayStatus,
        getChat,
        setGetChat
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };


/*      
      case 'init':
        setMessages(payload);
        break;
      case 'output':
        setMessages(() => [...messages, ...payload]);
        break;
      case 'status':
        setStatus(payload);
        break;
      case 'cleared':
        setMessages([]);
        break;
*/