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
      console.log("Sinal de Vida");
      event.streams[0].getTracks().forEach((track) => {
        console.log("External track: ", track);
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
    await this.rc.setLocalDescription(offer);

    this.rc.onicecandidate = (event) => {
      event.candidate &&
        socket.emit("iceCandidate", {
          chatID: this.chatID,
          iceCandidate: event.candidate.toJSON(),
        });
    };

    const callData: ICallData = {
      chatID: this.chatID,
      callerName,
      offer,
    };

    socket.emit("makeCall", callData);

    socket.off("onIceCandidate");
    socket.on("onIceCandidate", async (iceCandidate) => {
      const candidate = new RTCIceCandidate(iceCandidate);
      await this.rc.addIceCandidate(candidate);
    });
  }

  async acceptCall(callReceiverName: string) {
    socket.off("call");
    socket.off("onIceCandidate");

    socket.on("call", async (call: ICallData) => {
      console.log("aqui");

      this.rc.onicecandidate = (event) => {
        event.candidate &&
          socket.emit("iceCandidate", {
            chatID: this.chatID,
            iceCandidate: event.candidate.toJSON(),
          });
      };

      const remoteDescriptionSession = new RTCSessionDescription(call.offer);

      await this.rc.setRemoteDescription(remoteDescriptionSession);
      const callAnswer = await this.rc.createAnswer();
      await this.rc.setLocalDescription(callAnswer);

      const answer: ICallData = {
        chatID: call.chatID, // Redundante
        callerName: callReceiverName,
        offer: callAnswer,
      };

      socket.emit("acceptCall", answer);
    });
    socket.on("onIceCandidate", async (iceCandidate) => {
      const candidate = new RTCIceCandidate(iceCandidate);
      await this.rc.addIceCandidate(candidate);
    });
  }

  async handleCalls() {
    // dps que a call for aceita --> espera da answer
    let hasCalled = false;
    socket.off("acceptedCall");
    socket.off("onIceCandidates");

    socket.on("onIceCandidates", async (iceCandidate) => {
      const candidate = new RTCIceCandidate(iceCandidate);
      console.log(candidate);
      await this.rc.addIceCandidate(candidate);
    });
    socket.on("acceptedCall", async (callAnswer: ICallData) => {
      if (!hasCalled) {
        const remoteDescription = new RTCSessionDescription(callAnswer.offer);
        await this.rc.setRemoteDescription(remoteDescription);

        hasCalled = true;
      }
    });
  }
}
