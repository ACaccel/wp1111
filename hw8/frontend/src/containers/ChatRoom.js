import styled from 'styled-components';
import { Tabs, Input, Button } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useChat } from './hooks/useChat';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

import { useQuery } from '@apollo/client';
import { CHATBOX_QUERY,
          MESSAGE_SUBSCRIPTION } from '../graphql';

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
    startChat,
    sendMessage,
    displayStatus } = useChat();

  const [activeKey, setActiveKey] = useState('');
  const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key }
  const [msg, setMsg] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  
  const DisplayMessages = ({ friend }) => {
    const messagesFooter = useRef(null);

    /*---------------graphql--------------*/
    const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
      variables: {
        name1: me,
        name2: friend,
      },
    });

    useEffect(() => {
      try {
        subscribeToMore({
          document: MESSAGE_SUBSCRIPTION,
          variables: { from: me, to: friend },
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.message;

            // console.log('prev', prev);
            // console.log('newMessage', newMessage)

            return{
              chatbox: {
                name: prev.chatbox.name,
                messages: [...prev.chatbox.messages, newMessage],
                __typename: 'ChatBox'
              },
            };
          },
        });
      }
      catch(e){}
    }, [subscribeToMore]);
    /*------------------------------------*/

    const scrollToBottom = () => {
      messagesFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    useEffect(() => {
      scrollToBottom()
    }, [data]);

    // console.log('data', data)

    if(loading) return <p>loading</p>;
    return (
      data.chatbox.messages.length === 0 ? (
        <p style={{ color: '#ccc' }}> No messages... </p>
      ) : (
        <>
          {data.chatbox.messages.map(({ sender, body }, idx) => (
            <Message name={sender} isMe={sender === me} message={body} key={idx} />
          ))}
          <FootRef ref={messagesFooter} />
        </>)
    );
  };

  const extractChat = (friend) => {
    return <DisplayMessages friend={friend} />
  }

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => (key === friend)))
      throw new Error(friend + "'s chat box has already opened.");
    const chat = extractChat(friend);
    console.log('createChatBox chat:', chat);
    setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
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

  return (
    <>
      {/* clear behavior not implemented */}
      {/*<Button type="primary" danger onClick={clearMessages} >
        Clear
      </Button>*/}
      <Title name={me} />
      <>
        <ChatBoxesWrapper
          tabBarStyle={{ height: '36px' }}
          type='editable-card'
          activeKey={activeKey}
          onChange={async (key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === 'add') setModalOpen(true);
            else if (action === 'remove') setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          items={chatBoxes}
        />
        <ChatModal
          open={modalOpen}
          onCreate={async ({ name }) => {
            setActiveKey(createChatBox(name));
            setModalOpen(false);
            await startChat({
              variables: {
                name1: me,
                name2: name
              }
            });
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
          if (!activeKey) {
            displayStatus({
              type: 'error',
              msg: 'Please choose the chatbox.'
            });
            return;
          }
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a message body.'
            });
            return;
          }

          sendMessage({ 
            variables: {
              name: me,
              to: activeKey,
              body: msg
            } 
          });
          setMsg('');
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom;
