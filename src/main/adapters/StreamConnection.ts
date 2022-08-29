/* eslint-disable @typescript-eslint/no-explicit-any */
import { socket } from "../libs/SocketIO";
import { config } from "../../config";

// Mudar
export class StreamConnection {
  constructor(private chatID: string) {}
  private rc = new RTCPeerConnection(config.iceServers);
  private localStream: any;
  private remoteStream: any;

  // listen

  async addRTCTracks() {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const remoteStream = new MediaStream();

    this.localStream = localStream;
    this.remoteStream = remoteStream;

    localStream.getTracks().forEach((track) => {
      this.rc.addTrack(track, localStream);
    });

    this.rc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        console.log("Extern track: ", track);
        remoteStream.addTrack(track);
      });
    };
  }

  setVideoSrcObject(
    localStreamVideoElement: HTMLVideoElement,
    remoteStreamVideoElement: HTMLVideoElement,
  ) {
    console.log(this.localStream);

    localStreamVideoElement.srcObject = this.localStream;
    remoteStreamVideoElement.srcObject = this.remoteStream;
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
