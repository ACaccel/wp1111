import Message from "./models/message";
import { UserModel, ChatBoxModel, MessageModel } from './models/chatbox.js';

const makeName = (name, to) => {
   return [name, to].sort().join('_'); 
};

const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box)
    box = await new ChatBoxModel({ name, users: participants }).save();
  return box.populate(['users', { path: 'messages', populate: 'sender' }]);
}

const validateUser = async (name) => {
  console.log('Finding...' + name);
  const existing = await UserModel.findOne({ name });
  console.log(existing);
  if (existing) return existing;
  return new UserModel({ name }).save();
}

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(['status', payload], ws);
};

const broadcastMessage = (wss, data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

const chatBoxes = {};

export default {
  onMessage: (wss, ws) => (
    async (byteString) => {
      const { type, payload } = JSON.parse(byteString.data);
      switch (type) {
        case 'CHAT': {
          const { name, to } = payload;
          const chatBoxName = makeName(name, to);
          const sender = await validateUser(name);
          const receiver = await validateUser(to);
          const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

          if (ws.box !== '' && chatBoxes[ws.box])
            chatBoxes[ws.box].delete(ws);
          
          ws.box = chatBoxName;
          if (!chatBoxes[chatBoxName])
            chatBoxes[chatBoxName] = new Set();
          chatBoxes[chatBoxName].add(ws);

          sendData({
            type: 'CHAT',
            payload:
              chatBox.messages.map(({ sender: { name }, body }) => ({
                name,
                body
              }))
          }, ws)

          break;
        }
        case 'MESSAGE': {
          const { name, to, body } = payload;
          const chatBoxName = makeName(name, to);
          const sender = await validateUser(name);
          const receiver = await validateUser(to);
          const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

          const newMessage = new MessageModel({ sender, body });
          await newMessage.save();

          chatBox.messages.push(newMessage);
          await chatBox.save();

          chatBoxes[chatBoxName].forEach((ws) => {
            sendData({
              type: 'MESSAGE',
              payload: {
                name,
                body
              }
            }, ws)
          })

          break;
        }
        case 'CLEAR': {
          MessageModel.deleteMany({}, () => {
            sendData({
              type: 'CLEAR',
              payload: {}
            }, ws)
          })
          
          break;
        }
        default:break;
      }
    }
  )
}

/*
  initData: (ws) => {
    Message.find()
    .sort({ created_at: -1 })
    .limit(100)
    .exec((err, res) => {
      if (err) throw err;
      sendData(['init', res], ws);
    });
  },
  */

/*
        case 'input': 
          const { name, body } = payload;
          const message = new Message({ name, body });
          try {
            await message.save();
          } catch (err) {
            throw new Error('Message DB save error: ' + err);
          }

          broadcastMessage(
            wss, 
            ['output', [payload]], 
            {
              type: 'success',
              msg: 'Message sent.'
            });
          break;
        case 'clear':
          Message.deleteMany({}, () => {
            broadcastMessage(
              wss, 
              ['cleared', []], 
              {
                type: 'info',
                msg: 'Message cache cleared.'
              });
          })
          break;
        */