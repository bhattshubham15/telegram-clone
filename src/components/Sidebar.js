import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SearchIcon from '@material-ui/icons/Search'
import { BorderColorOutlined, PhoneOutlined, QuestionAnswerOutlined, Settings } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import SidebarThread from './SidebarThread'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import db, { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../features/userSlice'
import { setThread } from '../features/threadSlice'


const Sidebar = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [thread, setThreads] = useState([])
    const [profileDropDown, setprofileDropDown] = useState(false)

    useEffect(() => {
        db.collection('threads').onSnapshot((snapshot) => {
            setThreads(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    const addThread = () => {
        const threadName = prompt("Enter a thread name")
        if (threadName) {
            db.collection('threads').add({
                threadName: threadName,
            })
        }
    }

    const profileDropdownOpen = (e) => {
        setprofileDropDown(e.currentTarget)
    }

    const profileDropdownClose = (e) => {
        setprofileDropDown(false)
    }

    const signOut = async () => {
        auth.signOut()
        await dispatch(logout({ user: null }), setThread({ threadVisited: false }))
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon className="sidebar__searchicon" />
                    <input type="text" placeholder="Search" className="sidebar__input" />
                </div>
                <IconButton variant="outlined" onClick={addThread} id="sidebar__button">
                    <BorderColorOutlined />
                </IconButton>
            </div>
            <div className="sidebar__threads">
                {thread.map(({ id, data: { threadName } }) => {
                    return (
                        <SidebarThread key={id} id={id} threadName={threadName} />
                    )
                })}
            </div>
            <div className="sidebar__bottom">
                <Avatar className="sidebar__bottom__avatar" />
                <IconButton>
                    <PhoneOutlined />
                </IconButton>
                <IconButton>
                    <QuestionAnswerOutlined />
                </IconButton>
                <IconButton onClick={profileDropdownOpen}>
                    <Settings />
                </IconButton>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={profileDropDown}
                keepMounted
                open={profileDropDown && true}
                onClose={profileDropdownClose}
            >
                <MenuItem disabled className="profile-dropdown">
                    Hello {user.displayName}
                </MenuItem>
                <MenuItem className="profile-dropdown">
                    Additional settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default Sidebar

