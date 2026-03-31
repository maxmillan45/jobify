// src/pages/Notifications.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock, Trash2, CheckCheck, Eye } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Application Viewed',
      message: 'Tech Corp has viewed your application for Frontend Developer position',
      time: '5 minutes ago',
      read: false,
      link: '/jobs/1'
    },
    {
      id: 2,
      title: 'New Job Match',
      message: 'New job matches your profile: Senior React Developer at Innovate Labs',
      time: '1 hour ago',
      read: false,
      link: '/jobs/2'
    },
    {
      id: 3,
      title: 'Interview Scheduled',
      message: 'Congratulations! You have been selected for an interview at Cloud Systems',
      time: '1 day ago',
      read: true,
      link: '/applications'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
          
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm p-4 ${!notification.read ? 'border-l-4 border-l-yellow-400' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </span>
                      {!notification.read && <span className="text-yellow-600">New</span>}
                    </div>
                    <button
                      onClick={() => navigate(notification.link)}
                      className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-yellow-600"
                      >
                        <CheckCheck className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You don't have any notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;