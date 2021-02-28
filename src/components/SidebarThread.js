import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import db from '../firebase'
import './SidebarThread.css'
import { setThread } from '../features/threadSlice'

const SidebarThread = ({ id, threadName }) => {
    const dispatch = useDispatch()
    const [threadInfo, setThreadInfo] = useState([])

    useEffect(() => {
        db.collection('threads')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setThreadInfo(snapshot.docs.map((doc) => doc.data()))
            })
    }, [])

    const threadClick = async () => {
        await dispatch(
            setThread({
                threadId: id,
                threadName: threadName,
                threadVisited: true,
            })
        )
    }

    return (
        <div className="sidebarThread"
            onClick={threadClick}
        >
            <Avatar src={threadInfo[0]?.photo} />
            <div className="sidebarThread__details">
                <h3>{threadName}</h3>
                <p>This is info</p>
                <small className="sidebarThread__timestamp">
                    {threadInfo.timeStamp && new Date(threadInfo.timeStamp.toDate()).toLocaleString()}
                </small>
            </div>
        </div>
    )
}

export default SidebarThread
