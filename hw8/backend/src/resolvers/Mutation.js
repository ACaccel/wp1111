import { checkOutChatBox, makeName } from "./utility";

const Mutation = {
  createChatBox: (parent, { name1, name2 }, { ChatBoxModel }) => {
    return checkOutChatBox(name1, name2, ChatBoxModel);
  },
  createMessage: async (parnet, { name, to, body }, { ChatBoxModel, pubsub }) => {
    const chatBox = await checkOutChatBox(name, to, ChatBoxModel);
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();

    const chatBoxName = makeName(name, to);
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: newMsg
    });
    return newMsg;
  }
}

export default Mutation;