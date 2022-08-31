import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// Adapters
import { StreamConnection } from "../adapters/StreamConnection";

// Interface
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";

// Hooks
import { useLoadLoggedContactData } from "../hooks/useLoadLoggedContactDataHook";

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
  const call = callParam == "true";

  useLoadLoggedContactData(
    setLoggedContactDataState,
    navigate,
    findContactByUsernameUsecase,
  );

  useEffect(() => {
    if (loggedContactDataState) {
      const streamConnection = new StreamConnection(chat_id as string);
      setup(streamConnection, LocalStreamState, RemoteStreamState);

      call
        ? useMakeCallMode(streamConnection, loggedContactDataState)
        : useReceiveCallMode(streamConnection);
    }
  }, [loggedContactDataState, LocalStreamState[0]]);

  return (
    <div>
      <h1>Call Page</h1>
      <video autoPlay playsInline id="local__webcam"></video>
      <video autoPlay playsInline id="remote__webcam"></video>
    </div>
  );
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

async function useReceiveCallMode(streamConnection: StreamConnection) {
  await streamConnection.acceptCall();
}

async function useMakeCallMode(
  streamConnection: StreamConnection,
  loggadContact: IContactQuery,
) {
  try {
    await streamConnection.call(loggadContact.name);
    streamConnection.handleCalls();
  } catch (e) {
    console.error(e);
  }
}
