import MessageTextIcon from "./icons/MessageTextIcon";
import MicIcon from "./icons/MicIcon";

// CSS
import "./styles/LastMessageComponent.scss";

// Readed funcionality

export function LastMessageComponent({
  isTextMessageType,
  messageText,
}: {
  isTextMessageType: boolean;
  messageText?: string;
}) {
  const text = isTextMessageType ? messageText : "Voice Message";
  const icon = isTextMessageType ? <MessageTextIcon /> : <MicIcon />;

  return (
    <div className="lastMessageComponent">
      <div className="lastMessageComponent__unReadMessagesLength"></div>
      <span className="lastMessageComponent__messageContent">{text}</span>
      <div className="lastMessageComponent__icon">{icon}</div>
    </div>
  );
}
