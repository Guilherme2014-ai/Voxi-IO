/*
Diferença entre comunicão e apresentação, uma vez que apresentação já configurada o fluxo dependerá apenas da conexão
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { socket } from "../libs/SocketIO";
import { config } from "../../config";
import { ICallData } from "../../interfaces/ICallData";

// Mudar
export class StreamConnection {
  constructor(private chatID: string) {}
  private rc = new RTCPeerConnection(config.iceServers);

  async setStreams(
    setLocalStreamState: (stream: MediaStream) => void,
    setRemoteStreamState: (stream: MediaStream) => void,
  ) {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      this.rc.addTrack(track, localStream);
    });

    this.rc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        console.log("Extern track: ", track);
        remoteStream.addTrack(track);
        setRemoteStreamState(remoteStream);
      });
    };

    setLocalStreamState(localStream);
  }

  setVideoSrcObject(
    localStreamVideoElement: HTMLVideoElement,
    remoteStreamVideoElement: HTMLVideoElement,
    localStreamState: MediaStream | null,
    remoteStreamState: MediaStream | null,
  ) {
    localStreamVideoElement.srcObject = localStreamState;
    remoteStreamVideoElement.srcObject = remoteStreamState;
  }

  async call(callerName: string) {
    const offer = await this.rc.createOffer();
    this.rc.setLocalDescription(offer);

    const callData: ICallData = {
      chatID: this.chatID,
      callerName,
      offer,
    };

    socket.emit("makeCall", callData);
  }

  // declineCall() {}
  async acceptCall(callReceiverName: string) {
    socket.on("call", async (call: ICallData) => {
      await this.rc.setRemoteDescription(call.offer);
      const callAnswer = await this.rc.createAnswer();

      const answer: ICallData = {
        chatID: call.chatID, // Redundante
        callerName: callReceiverName,
        offer: callAnswer,
      };

      console.log(answer);

      socket.emit("acceptCall", answer);
    });
  }

  async handleCalls() {
    // dps que a call for aceita --> espera da answer
    socket.on("acceptedCall", async (callAnswer: ICallData) => {
      console.log(callAnswer);
      // await this.rc.setRemoteDescription(callAnswer);
    });
  }
}
