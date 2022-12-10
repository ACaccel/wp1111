import styled from 'styled-components';
import { Tabs, Input, Button } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useChat } from './hooks/useChat';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 40px;
`;

const ChatRoom = () => {
  const { me,
    messages,
    startChat,
    sendMessage,
    displayStatus,
    clearMessages } = useChat();

  const [activeKey, setActiveKey] = useState('');
  const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key }
  const [msg, setMsg] = useState('');
  const [msgSent, setMsgSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const msgFooter = useRef(null);
  const [rerender, setRerender] = useState(false);

  const displayMessages = (chat) => {
    return (
      chat.length === 0 ? (
        <p style={{ color: '#ccc' }}> No messages... </p>
      ) : (
        <>
          {chat.map(({ name, body }, idx) => (
            <Message name={name} isMe={name === me} message={body} key={idx} />
          ))}
          <FootRef ref={msgFooter} />
        </>)
    );
  };

  const renderChat = (chat) => {
    return displayMessages(chat);
  };

  const extractChat = (friend) => {
    return renderChat(messages.filter(({ name, body }) => ((name === friend) || (name === me))));
  };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => (key === friend)))
      throw new Error(friend + "'s chat box has already opened.");
    const chat = extractChat(friend);
    console.log('createChatBox chat:', chat);
    setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({ key }) => (key === activeKey));
    const newChatBoxes = chatBoxes.filter(({ key }) => (key !== targetKey));
    setChatBoxes(newChatBoxes);

    return (
      activeKey ?
        activeKey === targetKey ?
          index === 0 ?
            '' : chatBoxes[index - 1].key
          : activeKey
        : ''
    );
  };

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
      ({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {
    let newChatBoxes = chatBoxes;
    const newMsg = messages[messages.length-1];
    console.log(newMsg)
    if (newMsg) {
      let newKey = newMsg.name;
      if (newMsg.name === me )
        newKey = activeKey;
      newChatBoxes.forEach((chatbox) => {
        if (newKey === chatbox.key) {
          chatbox.children = extractChat(chatbox.key);
          return;
        }
      })
    }
    else {
      newChatBoxes.forEach((chatbox) => {
        chatbox.children = extractChat(chatbox.key);
      })
    }
    
    setChatBoxes(newChatBoxes);
    setRerender(!rerender);
    console.log('reset')
  }, [messages]);

  console.log('messages:', messages)

  return (
    <>
      {/* modify wsConnect.js and useChat.js first if you want to use it */}
      {/*<Button type="primary" danger onClick={clearMessages} >
        Clear
      </Button>*/}
      <Title name={me} />
      <>
        <ChatBoxesWrapper
          
          tabBarStyle={{ height: '36px' }}
          type='editable-card'
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            startChat(me, key);
          }}
          onEdit={(targetKey, action) => {
            if (action === 'add') setModalOpen(true);
            else if (action === 'remove') setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          items={chatBoxes}
        />
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            startChat(me, name);
            setModalOpen(false);
          }}
          onCancel={() => {
            setModalOpen(false);
          }}
        />
      </>
      <Input.Search
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a message body.'
            });
            return;
          }
          if (!activeKey) {
            displayStatus({
              type: 'error',
              msg: 'Please choose the chatbox.'
            });
            return;
          }

          sendMessage({ name: me, to: activeKey, body: msg });
          setMsg('');
          setMsgSent(true);
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom;
