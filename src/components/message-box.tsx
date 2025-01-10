import React from 'react';
import './message-box.css';

export type MessageLevel = 'info' | 'error';

export interface MessageBoxProps {
  message: string;
  onClose: () => void;
  level?: MessageLevel;
}

export const MessageBox: React.FC<MessageBoxProps> = (props) => (
  <div className={`message-box message-box-${props.level ?? 'info'}`}>
    <div className="message-box__content">
      <span className="message-box__text">{props.message}</span>
      <button className="message-box__close" onClick={props.onClose}>×</button>
    </div>
  </div>
);
