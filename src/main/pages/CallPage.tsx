import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";

// Adapters

// Interface
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { Caller } from "../adapters/Caller";

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
      <video autoPlay playsInline id="webcam"></video>
    </div>
  );
}

async function makeCall(loggadContact: IContactQuery, selectedChatID: string) {
  try {
    const webCamElement = document.getElementById("webcam") as HTMLVideoElement;

    const caller = new Caller(selectedChatID);

    await caller.call(loggadContact.name);
    const localStream = await caller.setup();

    webCamElement.srcObject = localStream;
  } catch (e) {
    console.error(e);
  }
}
