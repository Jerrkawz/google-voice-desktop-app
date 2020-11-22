const OldNotification = Notification;

const { ipcRenderer } = require('electron')

// Notification shim to send a click event to the main process so we can unhide the window (if hidden)
Notification = function (title, options) {
    const oldNotification = new OldNotification(title, options);
    
    oldNotification.addEventListener('click', () => {
        console.log('clicked');
        ipcRenderer.send('notification-clicked', {});
    });

    return oldNotification;
};

Notification.prototype = OldNotification.prototype;
Notification.permission = OldNotification.permission;
Notification.requestPermission = OldNotification.requestPermission;