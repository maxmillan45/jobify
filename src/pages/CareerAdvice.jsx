import React, { useState } from 'react';

const CareerAdvice = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentTip, setCurrentTip] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'resume', name: 'Resume & CV' },
    { id: 'interview', name: 'Interview Tips' },
    { id: 'career-growth', name: 'Career Growth' },
    { id: 'salary', name: 'Salary & Negotiation' },
    { id: 'remote-work', name: 'Remote Work' },
    { id: 'skills', name: 'Skills Development' }
  ];

  const articles = [
    {
      id: 1,
      title: "10 Tips to Make Your Resume Stand Out in 2024",
      excerpt: "Learn how to craft a resume that catches recruiters' attention and highlights your unique value proposition.",
      category: "resume",
      readTime: "8 min read",
      date: "March 15, 2024",
      author: "Sarah Johnson",
      authorRole: "Senior HR Manager",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      content: "In today's competitive job market, having a standout resume is crucial. Focus on achievements rather than duties, use strong action verbs, and tailor your resume to each job description. Include keywords from the job posting to pass applicant tracking systems. Keep your format clean and professional, and always proofread before submitting."
    },
    {
      id: 2,
      title: "Mastering the Behavioral Interview: STAR Method Explained",
      excerpt: "Discover how to ace behavioral interview questions using the STAR method with real-world examples.",
      category: "interview",
      readTime: "10 min read",
      date: "March 12, 2024",
      author: "Michael Chen",
      authorRole: "Career Coach",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      content: "The STAR method (Situation, Task, Action, Result) is a structured way to answer behavioral interview questions. Start by describing the situation and task, then explain the actions you took, and finish with the results you achieved."
    },
    {
      id: 3,
      title: "How to Negotiate Your Salary Like a Pro",
      excerpt: "Expert strategies for negotiating your salary and benefits package confidently and successfully.",
      category: "salary",
      readTime: "12 min read",
      date: "March 10, 2024",
      author: "Emily Rodriguez",
      authorRole: "Compensation Specialist",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      content: "Research market rates for your position before negotiations. Know your worth and be prepared to articulate your value. Consider the entire compensation package including benefits and bonuses."
    },
    {
      id: 4,
      title: "Top 10 In-Demand Skills for 2024",
      excerpt: "Stay ahead of the curve by developing these highly sought-after skills in today's job market.",
      category: "skills",
      readTime: "6 min read",
      date: "March 8, 2024",
      author: "David Kim",
      authorRole: "Tech Recruiter",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      content: "Artificial Intelligence, Data Analysis, Cloud Computing, and Digital Marketing are among the top skills employers are seeking in 2024."
    },
    {
      id: 5,
      title: "Thriving in Remote Work: Best Practices",
      excerpt: "Tips for staying productive, connected, and maintaining work-life balance while working remotely.",
      category: "remote-work",
      readTime: "7 min read",
      date: "March 5, 2024",
      author: "Lisa Thompson",
      authorRole: "Remote Work Consultant",
      image: "https://images.unsplash.com/photo-1593642532842-1d2d9b9f7f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      content: "Create a dedicated workspace, establish a routine, set boundaries between work and personal life, overcommunicate with your team, and invest in reliable technology."
    },
    {
      id: 6,
      title: "Career Pivot: How to Successfully Change Industries",
      excerpt: "A step-by-step guide to transitioning into a new industry without starting from scratch.",
      category: "career-growth",
      readTime: "9 min read",
      date: "March 1, 2024",
      author: "James Wilson",
      authorRole: "Career Transition Coach",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      content: "Identify transferable skills, research your target industry, network with professionals in that field, gain relevant certifications if needed, and start with contract or freelance work."
    }
  ];

  const tips = [
    "Customize your resume for each job application. Highlight relevant skills and experiences that match the job description.",
    "Always send a thank-you email within 24 hours after an interview. It shows professionalism and keeps you top of mind.",
    "Invest 30 minutes daily in learning new skills. Continuous learning is key to career advancement.",
    "Build your professional network before you need it. Attend industry events and connect on LinkedIn.",
    "Set clear career goals and review them quarterly. Break down big goals into actionable steps."
  ];

  const filteredArticles = articles.filter(article => {
    return selectedCategory === 'all' || article.category === selectedCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    
    console.log('Subscribed:', newsletterEmail);
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    setNewsletterError('');
    setTimeout(() => setNewsletterSubmitted(false), 5000);
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'resume': 'Resume',
      'interview': 'Interview',
      'career-growth': 'Career Growth',
      'salary': 'Salary',
      'remote-work': 'Remote Work',
      'skills': 'Skills'
    };
    return labels[category] || category;
  };

  // Article Detail View
  if (selectedArticle) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-yellow-600 hover:text-yellow-700 mb-6 inline-flex items-center font-medium"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Career Advice
          </button>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=Career+Advice';
              }}
            />
            
            <div className="p-6 md:p-12">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-bold text-lg">
                  {selectedArticle.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">{selectedArticle.author}</p>
                  <p className="text-gray-500">{selectedArticle.authorRole}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm text-gray-500">{selectedArticle.date}</p>
                  <p className="text-sm text-gray-500">{selectedArticle.readTime}</p>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedArticle.title}
              </h1>
              
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Listing View
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Matching header colors */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Career Advice & Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert guidance to help you navigate your career journey
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-slate-900 shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <div 
                  key={article.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100" 
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full md:h-full md:w-64 object-cover"
                        src={article.image}
                        alt={article.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Featured+Article';
                        }}
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center mb-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          Featured
                        </span>
                        <span className="ml-3 text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-yellow-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-bold">
                            {article.author.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{article.author}</p>
                          <p className="text-sm text-gray-500">{article.authorRole}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
              <p className="text-gray-600">{filteredArticles.length} article(s)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <div 
                  key={article.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100" 
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=Career+Advice';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-yellow-600 font-semibold uppercase tracking-wide">
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-yellow-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.excerpt.substring(0, 100)}...</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{article.author}</p>
                        <p className="text-xs text-gray-500">{article.authorRole}</p>
                      </div>
                      <span className="text-xs text-gray-400">{article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
            <p className="mt-2 text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Career Tips Section - Matching theme */}
      <div className="bg-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Career Tips</h2>
            <p className="text-xl text-gray-600">Quick actionable advice to boost your career</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-yellow-100">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{tips[currentTip]}</p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={prevTip}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Previous Tip
                  </button>
                  <button
                    onClick={nextTip}
                    className="px-4 py-2 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Next Tip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup - Matching header colors */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Career Advice Delivered to Your Inbox
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to receive weekly career tips and job search strategies.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Subscribe
              </button>
            </div>
            {newsletterError && <p className="text-red-400 mt-2 text-sm">{newsletterError}</p>}
            {newsletterSubmitted && (
              <p className="text-green-400 mt-2 text-sm">
                Successfully subscribed!
              </p>
            )}
          </form>
          
          <p className="text-gray-400 text-sm mt-6">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerAdvice;