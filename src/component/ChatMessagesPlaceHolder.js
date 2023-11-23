import style from '../css/ChatMessage.module.css';
const MessageReceived = (props) => {
    return (
        <div>
            <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
        </div>
    );
};

const ChatMessagesPlaceholder = (props) => {
    return (
        <>
            <>
                <div className={style.root}>
                    <div className={style.message}>

                        {props.messagesReceived.map(message => (
                            <MessageReceived
                                key={message.id}
                                from={message.from}
                                direct={message.to === props.username}
                                text={message.text}
                                isCurrentUser={message.from === props.username}
                            />
                        ))}
                    </div>
                </div>

            </>

        </>
    );
}

export default ChatMessagesPlaceholder;