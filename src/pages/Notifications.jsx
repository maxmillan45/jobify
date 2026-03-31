// src/pages/Notifications.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Briefcase, 
  MessageCircle, 
  User,
  Trash2,
  CheckCheck,
  Eye,
  Star,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Viewed',
      message: 'Tech Corp has viewed your application for Frontend Developer position',
      time: '5 minutes ago',
      read: false,
      icon: Eye,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      link: '/jobs/1'
    },
    {
      id: 2,
      type: 'job',
      title: 'New Job Match',
      message: 'New job matches your profile: Senior React Developer at Innovate Labs',
      time: '1 hour ago',
      read: false,
      icon: Briefcase,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      link: '/jobs/2'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from HR Manager at Creative Studio',
      time: '3 hours ago',
      read: true,
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      link: '/messages'
    },
    {
      id: 4,
      type: 'application',
      title: 'Interview Scheduled',
      message: 'Congratulations! You have been selected for an interview at Cloud Systems',
      time: '1 day ago',
      read: true,
      icon: Calendar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      link: '/applications'
    },
    {
      id: 5,
      type: 'job',
      title: 'Job Alert',
      message: '5 new jobs posted in your area: Software Engineer positions available',
      time: '2 days ago',
      read: true,
      icon: Star,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      link: '/jobs'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'applications', label: 'Applications', count: notifications.filter(n => n.type === 'application').length },
    { id: 'jobs', label: 'Jobs', count: notifications.filter(n => n.type === 'job').length },
    { id: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'applications') return notification.type === 'application';
    if (filter === 'jobs') return notification.type === 'job';
    if (filter === 'messages') return notification.type === 'message';
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(notif => !selectedNotifications.includes(notif.id)));
    setSelectedNotifications([]);
  };

  const toggleSelect = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(notifId => notifId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const selectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated with your job search activity</p>
            </div>
            {notifications.some(n => !n.read) && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center"
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {filters.map((filterItem) => (
                <button
                  key={filterItem.id}
                  onClick={() => setFilter(filterItem.id)}
                  className={`px-6 py-3 whitespace-nowrap font-medium transition-colors ${
                    filter === filterItem.id
                      ? 'text-yellow-600 border-b-2 border-yellow-400'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {filterItem.label}
                  {filterItem.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      filter === filterItem.id ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {filterItem.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center justify-between">
              <span className="text-sm text-yellow-800">
                {selectedNotifications.length} notification{selectedNotifications.length !== 1 ? 's' : ''} selected
              </span>
              <button
                onClick={deleteSelected}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete selected
              </button>
            </div>
          )}

          {/* Notifications List */}
          {filteredNotifications.length > 0 ? (
            <div className="space-y-2">
              {/* Select All */}
              <div className="flex items-center justify-end mb-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {selectedNotifications.length === filteredNotifications.length ? 'Deselect all' : 'Select all'}
                </button>
              </div>

              {filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                const isSelected = selectedNotifications.includes(notification.id);
                
                return (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                      !notification.read ? 'border-l-4 border-l-yellow-400' : ''
                    }`}
                  >
                    <div className="p-4 flex items-start space-x-4">
                      {/* Checkbox */}
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(notification.id)}
                          className="h-4 w-4 text-yellow-400 rounded border-gray-300 focus:ring-yellow-400"
                        />
                      </div>

                      {/* Icon */}
                      <div className={`${notification.bgColor} p-2 rounded-lg`}>
                        <Icon className={`${notification.color} h-5 w-5`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <span className="text-yellow-600">New</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-yellow-600"
                                title="Mark as read"
                              >
                                <CheckCheck className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(notification.link)}
                          className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center"
                        >
                          View details
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You don't have any notifications yet" 
                  : `No ${filter} notifications to display`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;