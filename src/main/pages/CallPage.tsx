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
  const { chat_id, call: callParam } = useParams<{
    chat_id: string;
    call: string;
  }>();
  const call = callParam == "true" ? true : false;

  useLoadLoggedContactData(
    setLoggedContactDataState,
    navigate,
    findContactByUsernameUsecase,
  );

  useEffect(() => {
    if (loggedContactDataState) {
      if (call) {
        makeCall(loggedContactDataState, chat_id as string);
      }
    }
  }, [loggedContactDataState]);

  return (
    <div>
      <h1>Call Page</h1>
      <video autoPlay playsInline id="local__webcam"></video>
      <video autoPlay playsInline id="remote__webcam"></video>
    </div>
  );
}

async function makeCall(loggadContact: IContactQuery, selectedChatID: string) {
  try {
    const localWebCamElement = document.getElementById(
      "local__webcam",
    ) as HTMLVideoElement;
    const remoteWebCamElement = document.getElementById(
      "remote__webcam",
    ) as HTMLVideoElement;

    const streamConnection = new StreamConnection(selectedChatID);
    await streamConnection.addRTCTracks();
    await streamConnection.setVideoSrcObject(
      localWebCamElement,
      remoteWebCamElement,
    );

    await streamConnection.call(loggadContact.name);

    // webCamElement.srcObject = localStream;
  } catch (e) {
    console.error(e);
  }
}
