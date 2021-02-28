import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import TelegramImage from '../assets/telegram.png'
import './Login.css'

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__telegram">
                <img src={TelegramImage} alt="telegram_image" />
                <h1>Telegram</h1>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
