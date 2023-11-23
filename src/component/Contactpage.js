import React, { useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid'
import ChatMessagesPlaceholder from './ChatMessagesPlaceHolder';
import SendMessagePlaceholder from './SendMessagePlaceholder';
import UsernamePlaceholder from './UsernamePlaceholder';
import style from '../css/Chat.module.css';
function Contact() {

  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  


  const setupStompClient = (username) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      const notificationMessage = {
        id: uuidv4(),
        from: username,
        text: 'has joined the chat'
      };
      stompClient.publish({
        destination: '/topic/publicmessages',
        body: JSON.stringify(notificationMessage)
      });
    };


    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  };

  const handleLogout = () => {
    if (stompClient) {
      const notificationMessage = {
        id: uuidv4(),
        from: username,
        text: 'has logged out',
      };
      stompClient.publish({
        destination: '/topic/publicmessages',
        body: JSON.stringify(notificationMessage),
      });

      // Close the WebSocket connection
      stompClient.deactivate();
    }

    // Reset the username and clear the messages
    setUsername('');
    setMessagesReceived([]);
  };


  // send the data using Stomp
  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      stompClient.publish({ 'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
    } else {
      stompClient.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  const onUsernameInformed = (username) => {

    setUsername(username);
    setupStompClient(username);
  }

  return (
    <div className={style.root}>
      {username ? (
        <>
          <div className={style.hearderChat}>
            <p className={style.text}>Chatbox</p>
            <button type="button" className={style.logout} onClick={handleLogout}> X </button>
          </div>
          <div>
            <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
            <br />
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />

          </div></>
      ) : (
        <UsernamePlaceholder onUsernameInformed={onUsernameInformed} />
      )}
    </div>
  );
}

export default Contact;
