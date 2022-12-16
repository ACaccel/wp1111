import { checkOutChatBox } from "./utility";

const Query = {
  chatbox: (parent, { name1, name2 }, { ChatBoxModel }) => {
    return checkOutChatBox(name1, name2, ChatBoxModel);
  }
}

export default Query;