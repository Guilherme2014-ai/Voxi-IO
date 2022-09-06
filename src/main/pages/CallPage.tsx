import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// Usecases
import { joinRoom } from "../__usecases/join_rooms";

// Adapters
import { StreamConnection } from "../adapters/StreamConnection";

// Interface
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";

// Hooks
import { useLoadLoggedContactData } from "../hooks/useLoadLoggedContactDataHook";

let once = false;

export function CallPage({
  findContactByUsernameUsecase,
}: {
  findContactByUsernameUsecase: IFindContactByUsername;
}) {
  const navigate = useNavigate();
  const [loggedContactDataState, setLoggedContactDataState] =
    useState<IContactQuery | null>(null);

  const LocalStreamState = useState<null | MediaStream>(null);
  const RemoteStreamState = useState<null | MediaStream>(null);

  const { chat_id, call: callParam } = useParams<{
    chat_id: string;
    call: string;
  }>();
  const isCallMaker = callParam == "true";

  useSetCallMode(
    loggedContactDataState,
    LocalStreamState,
    RemoteStreamState,
    isCallMaker,
    chat_id as string,
  );
  useLoadLoggedContactData(
    setLoggedContactDataState,
    navigate,
    findContactByUsernameUsecase,
  );

  return (
    <div>
      <h1>Call Page</h1>
      <video autoPlay playsInline id="local__webcam"></video>
      <video autoPlay playsInline id="remote__webcam"></video>
    </div>
  );
}

async function useSetCallMode(
  loggedContactDataState: IContactQuery | null,
  LocalStreamState: [
    MediaStream | null,
    React.Dispatch<React.SetStateAction<MediaStream | null>>,
  ],
  RemoteStreamState: [
    MediaStream | null,
    React.Dispatch<React.SetStateAction<MediaStream | null>>,
  ],
  isCallMaker: boolean,
  chat_id: string,
) {
  useEffect(() => {
    if (loggedContactDataState) {
      const streamConnection = new StreamConnection(chat_id);
      setup(streamConnection, LocalStreamState, RemoteStreamState, chat_id); // Bobisse

      setTimeout(() => {
        isCallMaker
          ? useMakeCallMode(streamConnection, loggedContactDataState)
          : useReceiveCallMode(streamConnection, loggedContactDataState);
      }, 1000);
    }
  }, [loggedContactDataState, LocalStreamState[0]]);
}

async function setup(
  streamConnection: StreamConnection,
  LocalStream: [
    MediaStream | null,
    React.Dispatch<React.SetStateAction<MediaStream | null>>,
  ],
  RemoteStream: [
    MediaStream | null,
    React.Dispatch<React.SetStateAction<MediaStream | null>>,
  ],
  chat_id: string,
) {
  try {
    const localWebCamElement = document.getElementById(
      "local__webcam",
    ) as HTMLVideoElement;
    const remoteWebCamElement = document.getElementById(
      "remote__webcam",
    ) as HTMLVideoElement;

    const [localStreamState, setLocalStreamState] = LocalStream;
    const [remoteStreamState, setRemoteStreamState] = RemoteStream;

    function setLocalStreamFunc(stream: MediaStream) {
      setLocalStreamState(stream);
    }
    function setRemoteStreamFunc(stream: MediaStream) {
      setRemoteStreamState(stream);
    }

    const chatIds = [{ id: chat_id }];
    joinRoom(chatIds);

    if (!LocalStream[0])
      await streamConnection.setStreams(
        setLocalStreamFunc,
        setRemoteStreamFunc,
      );

    streamConnection.setVideoSrcObject(
      localWebCamElement,
      remoteWebCamElement,
      localStreamState,
      remoteStreamState,
    );
  } catch (e) {
    console.error(e);
  }
}

async function useReceiveCallMode(
  streamConnection: StreamConnection,
  loggedContactDataState: IContactQuery | null,
) {
  try {
    if (once == false && loggedContactDataState) {
      await streamConnection.acceptCall(loggedContactDataState.name);
    }
  } catch (e) {
    console.error(e);
  }
}

async function useMakeCallMode(
  streamConnection: StreamConnection,
  loggedContactDataState: IContactQuery | null,
) {
  try {
    if (once == false && loggedContactDataState) {
      await streamConnection.call(loggedContactDataState.name);
      streamConnection.handleCalls();

      once = true;
    }
  } catch (e) {
    console.error(e);
  }
}
