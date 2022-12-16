import styled from 'styled-components';
import { useEffect } from 'react';
import { useChat } from './hooks/useChat';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const { signedIn } = useChat();

  return (
    <Wrapper> {signedIn ? <ChatRoom /> : <SignIn />} </Wrapper>
  );
}


export default App;
