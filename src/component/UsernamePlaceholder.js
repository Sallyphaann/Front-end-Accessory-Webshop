import style from '../css/UserNamePlaceHolder.module.css';
import { useState } from 'react';
const UsernamePlaceholder = (props) => {

  const [username, setUsername] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  if (props.username) {
    return (<h2>Username: {props.username}</h2>)
  }
  const handleButtonClick = () => {
    if (username === '') {
      alert('Please write your username');
    } else {
      props.onUsernameInformed(username);
    }
  };

  return (
    <>
    <div className={style.container}>
      <div className={style.register}>
        <input id='username' placeholder="Enter your name" type='text' value={username}
          onChange={handleUsernameChange}
        />
        <button type="submit" onClick={handleButtonClick}> Connect </button>
      </div>
    </div>
    </>
  );
}

export default UsernamePlaceholder;