import React from 'react'
import './notification-box.css'

const NotificationBox = ({ notification, notificationStyle }) => {

    if (notification === null) {
        return null
    } else {
        return (
            <div className={notificationStyle}>
                {notification}
            </div>
        )
    }
}

export default NotificationBox