import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import './Message.css'

const Message = (data) => {
    const user = useSelector(selectUser)
    return (
        <div className={`message ${user.email === data.data.data.email && `message__sender`}`}>
            <Avatar src={data.data.data.photo} className="message__photo" />
            <div className="message__contents">
                <p>{data.data.data.message}</p>
                <small>{new Date(data.data.data.timeStamp?.toDate()).toLocaleString()}</small>
            </div>
        </div>
    )
}

export default Message
