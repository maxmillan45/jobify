// src/pages/Pricing.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  MessageCircle,
  FileText,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: {
        monthly: 49,
        yearly: 39
      },
      description: 'Perfect for small businesses',
      features: [
        'Post up to 5 jobs per month',
        'Basic candidate search',
        'Email support',
        'Job listing for 30 days',
        'Basic analytics'
      ],
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      buttonColor: 'border-gray-300 text-gray-700 hover:bg-gray-50'
    },
    {
      name: 'Professional',
      price: {
        monthly: 99,
        yearly: 79
      },
      description: 'Best for growing companies',
      features: [
        'Post up to 25 jobs per month',
        'Advanced candidate search',
        'Priority email & chat support',
        'Featured job listings',
        'Advanced analytics',
        'Candidate matching',
        'Interview scheduling'
      ],
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      buttonColor: 'bg-yellow-400 text-slate-900 hover:bg-yellow-500',
      popular: true
    },
    {
      name: 'Enterprise',
      price: {
        monthly: 299,
        yearly: 249
      },
      description: 'For large organizations',
      features: [
        'Unlimited job postings',
        'Premium candidate search',
        '24/7 phone & priority support',
        'Featured & highlighted listings',
        'Custom analytics & reports',
        'API access',
        'Dedicated account manager',
        'Custom branding'
      ],
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      buttonColor: 'border-gray-300 text-gray-700 hover:bg-gray-50'
    }
  ];

  const addOns = [
    {
      name: 'Featured Job Listing',
      price: 29,
      description: 'Highlight your job posting to attract more candidates',
      icon: Star
    },
    {
      name: 'Candidate Search Credits',
      price: 49,
      description: '50 candidate search credits to find the perfect talent',
      icon: Users
    },
    {
      name: 'Priority Support',
      price: 99,
      description: 'Get priority access to our support team',
      icon: Headphones
    }
  ];

  const handleSubscribe = (planName) => {
    navigate('/checkout', { state: { plan: planName, billingCycle } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your hiring needs. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-green-600">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden relative ${
                    plan.popular ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-3 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`${plan.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`${plan.color} h-6 w-6`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-green-600 mt-1">Billed annually</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleSubscribe(plan.name)}
                      className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${plan.buttonColor}`}
                    >
                      Start Free Trial
                    </button>
                  </div>
                  <div className="border-t border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add-ons & Extras</h2>
              <p className="text-gray-600">Enhance your hiring strategy with additional features</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => {
                const Icon = addon.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                    <div className="bg-yellow-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-yellow-600 h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-4">${addon.price}</p>
                    <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                      Add to Plan
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Have questions? We're here to help</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time. No long-term contracts or hidden fees.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600 text-sm">All plans include a 14-day free trial. No credit card required to start.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I switch plans later?</h3>
                <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-sm p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to find the perfect talent?</h2>
            <p className="text-gray-300 mb-6">Start your 14-day free trial today. No credit card required.</p>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;