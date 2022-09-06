import { socket } from "../libs/SocketIO";

export function joinRoom(chatIds: { id: string }[]) {
  socket.emit("join_chats", chatIds);
}
