import { useState } from "react";
import style from '../css/SendMessage.module.css';


const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');
  const [destinationUsername, setDestinationUsername] = useState('');

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }
    props.onMessageSend({ 'text': message, 'to': destinationUsername });
    setMessage('');
  }
  

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={style.sendMessage}>
        <div className="input-group">
          <input type="text" name="message" placeholder="Type Message ..." className="form-control" onChange={(event) => setMessage(event.target.value)} value={message}></input>
          <span className="input-group-btn mr-40">
            <button type="button" className="customButton" onClick={onMessageSend}>Send</button>
          </span>
        </div>
      </div>

    </form>
  );
}

export default SendMessagePlaceholder;