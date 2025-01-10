import React from 'react';
import './server-error.css';

export const ServerErrorPage: React.FC = () => (
  <div className="server-error__container">
    <h1 className="server-error__title">Сервер недоступен</h1>
    <p className="server-error__message">Извините, мы не можем подключиться к серверу. Пожалуйста, попробуйте позже.</p>
  </div>
);
