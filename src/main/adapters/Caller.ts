import { socket } from "../libs/SocketIO";
import { config } from "../../config";

export class Caller {
  constructor(private chatID: string) {}
  private rc = new RTCPeerConnection(config.iceServers);

  async setup() {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const remoteStream = new MediaStream();

    return localStream;
  }
  async call(callerName: string) {
    const offer = await this.rc.createOffer();
    const callData = {
      chatID: this.chatID,
      callerName,
      offer: JSON.stringify(offer),
    };

    socket.emit("makeCall", callData);
  }

  // declineCall() {}
  // acceptCall() {}
}
