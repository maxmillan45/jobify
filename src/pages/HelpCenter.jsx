// src/pages/HelpCenter.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  BookOpen, 
  FileText, 
  Settings, 
  Shield, 
  AlertCircle,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();

  const helpTopics = [
    {
      title: "Getting Started",
      icon: BookOpen,
      questions: [
        "How to create an account",
        "How to set up your profile",
        "How to search for jobs"
      ]
    },
    {
      title: "Applications",
      icon: FileText,
      questions: [
        "How to apply for a job",
        "How to track applications",
        "Application status explained"
      ]
    },
    {
      title: "Account",
      icon: Settings,
      questions: [
        "How to reset password",
        "How to update profile",
        "How to delete account"
      ]
    },
    {
      title: "Security",
      icon: Shield,
      questions: [
        "How to secure your account",
        "Privacy settings",
        "Report suspicious activity"
      ]
    },
    {
      title: "Troubleshooting",
      icon: AlertCircle,
      questions: [
        "Login issues",
        "Payment problems",
        "Technical support"
      ]
    },
    {
      title: "FAQs",
      icon: HelpCircle,
      questions: [
        "Common questions",
        "Account verification",
        "Subscription plans"
      ]
    }
  ];

  const popularQuestions = [
    "How do I reset my password?",
    "How to upload a resume?",
    "How to track my application?",
    "How to delete my account?"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-gray-300">
            Find answers to your questions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Popular Questions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularQuestions.map((question, index) => (
              <button
                key={index}
                className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between group"
              >
                <span className="text-gray-700 group-hover:text-yellow-600">{question}</span>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {helpTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-yellow-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-yellow-600 h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{topic.title}</h3>
                <ul className="space-y-2">
                  {topic.questions.map((question, idx) => (
                    <li key={idx}>
                      <button className="text-gray-600 hover:text-yellow-600 text-sm">
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-sm p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-gray-300 mb-6">Our support team is here for you</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contact Support</span>
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Email Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;