import React from 'react'
import './notification.css'

const Notification = ({ notificationText, notificationStyle }) => {
    if (notificationText === null) {
        return null
    } else {
        return (
            <div className={notificationStyle}>
                {notificationText}
            </div>
        )
    }
}

export default Notification