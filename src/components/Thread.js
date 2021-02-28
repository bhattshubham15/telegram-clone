import { Avatar, IconButton } from '@material-ui/core'
import { MicNoneOutlined, MoreHoriz, SendRounded, TimerOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectThreadId, selectThreadName, selectThreadVisited } from '../features/threadSlice'
import { selectUser } from '../features/userSlice'
import db from '../firebase'
import firebase from 'firebase'
import './Thread.css'
import Message from './Message'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const Thread = () => {
    const user = useSelector(selectUser)
    const threadId = useSelector(selectThreadId)
    const threadName = useSelector(selectThreadName)
    const threadVisited = useSelector(selectThreadVisited)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const classes = useStyles();

    useEffect(() => {
        if (threadId) {
            db.collection('threads')
                .doc(threadId)
                .collection('messages')
                .onSnapshot((snapshot) => {
                    setMessages(
                        snapshot.docs.map((i) => ({
                            id: i.id,
                            data: i.data()
                        }))
                    )
                })
        }
    }, [threadId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('threads').doc(threadId).collection('messages').add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        }).then(() => {
            setInput('')
        })
    }

    if (!threadVisited) {
        return (
            <div className="thread">
                <div className="thread thread__notvisited__parent">
                    <Avatar src={user.photo} className={classes.large} />
                    <h1>Welcome {user.displayName}!</h1>
                </div>
            </div>
        )
    } else {
        return (
            <div className="thread">
                <div className="thread__header">
                    <div className="thread__header__contents">
                        <Avatar />
                        <div className="thread__header__content__info">
                            <h4>{threadName}</h4>
                            <h5>Last seen</h5>
                        </div>
                    </div>
                    <IconButton>
                        <MoreHoriz className="thread__header__details" />
                    </IconButton>
                </div>
                <div className="thread__messages">
                    {messages.map((data, index) => {
                        return (
                            <Message key={index} data={data} />
                        )
                    })}
                </div>
                <div className="thread__input">
                    <form onSubmit={sendMessage}>
                        <input type="text" placeholder="write a message..." value={input} onChange={(e) => setInput(e.target.value)} />
                        <IconButton>
                            <TimerOutlined />
                        </IconButton>
                        <IconButton onClick={sendMessage}>
                            <SendRounded />
                        </IconButton>
                        <IconButton>
                            <MicNoneOutlined />
                        </IconButton>
                    </form>
                </div>
            </div>
        )
    }
}

export default Thread
