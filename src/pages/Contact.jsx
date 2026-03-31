// src/pages/Contact.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactMethods = [
    {
      title: "Email Support",
      icon: Mail,
      details: "support@jobify.com",
      description: "Get help via email",
      response: "Response within 24 hours",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "Live Chat",
      icon: MessageCircle,
      details: "Chat with our team",
      description: "Available 24/7",
      response: "Instant response",
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "Phone Support",
      icon: Phone,
      details: "+1 (555) 123-4567",
      description: "Call us directly",
      response: "Mon-Fri, 9am-6pm EST",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    }
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Broadway, Suite 100",
      phone: "+1 (212) 555-1234",
      email: "nyc@jobify.com"
    },
    {
      city: "San Francisco",
      address: "456 Market St, Floor 5",
      phone: "+1 (415) 555-5678",
      email: "sf@jobify.com"
    },
    {
      city: "London",
      address: "789 Oxford St",
      phone: "+44 20 1234 5678",
      email: "london@jobify.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className={`${method.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`${method.color} h-8 w-8`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-2">{method.description}</p>
                <p className="text-yellow-600 font-medium mb-1">{method.details}</p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {method.response}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-800">Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h2>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{office.city}</h3>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                      <p className="text-gray-500 text-sm mt-1">{office.phone}</p>
                      <p className="text-yellow-600 text-sm">{office.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-sm p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-gray-300">
                  Emergency support available 24/7 via live chat and email
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Looking for quick answers? Check our{' '}
            <button 
              onClick={() => navigate('/help')}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Frequently Asked Questions
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;