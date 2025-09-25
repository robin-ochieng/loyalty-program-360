'use client';
/* eslint-disable @typescript-eslint/no-unused-vars -- keep full icon import list per design */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Star,
  Zap,
  Globe,
  Heart,
  Home,
  Car,
  Plane,
  Briefcase,
  PawPrint,
  Building,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Gift,
  Target,
  Rocket,
} from 'lucide-react';
/* eslint-enable @typescript-eslint/no-unused-vars */

export default function HomePage() {
  const router = useRouter();
  // Removed local hero navigation; rely on global Topbar only
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Removed scroll styling logic for local hero nav

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tiers = [
    {
      name: 'Bronze',
      requirement: '1 Product',
      color: 'from-amber-600 to-amber-700',
      benefits: ['Basic rewards', 'Standard support', '1x points multiplier'],
      icon: '🥉',
    },
    {
      name: 'Silver',
      requirement: '2 Products',
      color: 'from-gray-400 to-gray-500',
      benefits: ['5% discount', 'Priority support', '1.2x points multiplier'],
      icon: '🥈',
    },
    {
      name: 'Gold',
      requirement: '3 Products',
      color: 'from-yellow-500 to-yellow-600',
      benefits: ['10% discount', 'Premium support', '1.5x points multiplier', 'Birthday bonus'],
      icon: '🥇',
      popular: true,
    },
    {
      name: 'Platinum',
      requirement: '5+ Products',
      color: 'from-purple-600 to-purple-700',
      benefits: ['15% discount', 'VIP support', '2x points multiplier', 'Exclusive offers'],
      icon: '💎',
    },
  ];

  const products = [
    {
      name: 'Motor Insurance',
      icon: Car,
      category: 'Core',
      description: 'Comprehensive vehicle coverage',
    },
    {
      name: 'Medical Insurance',
      icon: Heart,
      category: 'Core',
      description: 'Health protection for you and family',
    },
    { name: 'Home Insurance', icon: Home, category: 'Core', description: 'Protect your property' },
    {
      name: 'Pension (KIPF)',
      icon: Briefcase,
      category: 'Core',
      description: 'Secure your retirement',
    },
    {
      name: 'Travel Insurance',
      icon: Plane,
      category: 'Optional',
      description: 'Safe travels worldwide',
    },
    {
      name: 'Pet Insurance',
      icon: PawPrint,
      category: 'Optional',
      description: 'Care for your furry friends',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Happy Customers', icon: Users },
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '24/7', label: 'Customer Support', icon: Shield },
  ];

  const testimonials = [
    {
      name: 'Sarah Wanjiku',
      role: 'Platinum Member',
      content:
        'The rewards program has saved me thousands! Being a Platinum member gives me amazing discounts across all my insurance needs.',
      rating: 5,
    },
    {
      name: 'James Ochieng',
      role: 'Gold Member',
      content:
        'Kenbright360 makes managing multiple insurance products so easy. The points system is fantastic!',
      rating: 5,
    },
    {
      name: 'Mary Kamau',
      role: 'Silver Member',
      content:
        'Great service and the tier benefits really make a difference. Looking forward to reaching Gold status!',
      rating: 5,
    },
  ];

  const currentTestimonial =
    testimonials[activeTestimonial] ??
    testimonials[0] ??
    ({ name: '', role: '', content: '', rating: 0 } as const);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Custom SVG */}
      <section className="relative mt-16 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated background elements */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">
                  Kenya&apos;s Premium Insurance Loyalty Program
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Insure More,
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Earn More
                </span>
              </h1>

              <p className="text-xl text-gray-200 leading-relaxed">
                Join Kenbright 360° and unlock exclusive rewards, discounts, and benefits across our
                comprehensive insurance portfolio. The more you protect, the more you save!
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push('/kyc')}
                  className="group px-8 py-4 bg-white text-indigo-900 rounded-full font-semibold hover:scale-105 transition-all flex items-center shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() =>
                    document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm text-gray-300">Active Members</div>
                </div>
                <div className="w-px h-12 bg-white/30" aria-hidden="true"></div>
                <div>
                  <div className="text-3xl font-bold">15%</div>
                  <div className="text-sm text-gray-300">Max Discount</div>
                </div>
                <div className="w-px h-12 bg-white/30" aria-hidden="true"></div>
                <div>
                  <div className="flex -space-x-2" aria-hidden="true">
                    {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                      <span key={i} className="text-2xl">
                        {star}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-300">Rated Excellence</div>
                </div>
              </div>
            </div>

            {/* Modern SVG Illustration */}
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse"
                aria-hidden="true"
              ></div>
              <svg
                viewBox="0 0 600 600"
                className="relative w-full h-auto animate-float"
                aria-hidden="true"
              >
                {/* Outer Circle with gradient */}
                <defs>
                  <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#FACC15" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Animated background circles */}
                <circle
                  cx="300"
                  cy="300"
                  r="280"
                  fill="none"
                  stroke="url(#circleGradient)"
                  strokeWidth="2"
                  opacity="0.3"
                  className="animate-spin-slow"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="250"
                  fill="none"
                  stroke="url(#circleGradient)"
                  strokeWidth="1"
                  opacity="0.2"
                  strokeDasharray="10 10"
                  className="animate-spin-reverse"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="220"
                  fill="none"
                  stroke="url(#circleGradient)"
                  strokeWidth="1"
                  opacity="0.2"
                  strokeDasharray="5 15"
                  className="animate-spin-slow"
                />

                {/* Central Shield */}
                <g transform="translate(300, 300)" filter="url(#glow)">
                  <path
                    d="M-60,-80 L60,-80 L60,20 L0,100 L-60,20 Z"
                    fill="url(#shieldGradient)"
                    stroke="#FFF"
                    strokeWidth="3"
                    className="animate-pulse-slow"
                  />

                  {/* 360° text in shield */}
                  <text
                    x="0"
                    y="-20"
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontSize="36"
                    fontWeight="bold"
                  >
                    360°
                  </text>
                  <text
                    x="0"
                    y="10"
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontSize="14"
                    fontWeight="medium"
                  >
                    PROTECTED
                  </text>

                  {/* Shield checkmark */}
                  <path
                    d="M-20,30 L-5,45 L20,20"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Orbiting Icons */}
                <g className="animate-spin-slow" style={{ transformOrigin: '300px 300px' }}>
                  {/* Car Icon */}
                  <g transform="translate(450, 300)">
                    <circle r="30" fill="#EDE9FE" />
                    <path
                      d="M-12,-5 L12,-5 L10,5 L-10,5 Z M-15,5 L-15,10 L-10,10 M10,10 L15,10 L15,5"
                      stroke="#7C3AED"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="-8" cy="10" r="3" fill="#7C3AED" />
                    <circle cx="8" cy="10" r="3" fill="#7C3AED" />
                  </g>

                  {/* Home Icon */}
                  <g transform="translate(300, 150)">
                    <circle r="30" fill="#DBEAFE" />
                    <path
                      d="M0,-12 L-12,0 L-12,12 L-4,12 L-4,4 L4,4 L4,12 L12,12 L12,0 Z"
                      fill="#3B82F6"
                    />
                    <path
                      d="M0,-12 L-15,-2 M0,-12 L15,-2"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Heart Icon */}
                  <g transform="translate(150, 300)">
                    <circle r="30" fill="#FCE7F3" />
                    <path
                      d="M0,5 C-20,-25 20,-25 0,5 C20,-25 -20,-25 0,5"
                      fill="#EC4899"
                      transform="scale(0.7)"
                    />
                  </g>

                  {/* Plane Icon */}
                  <g transform="translate(300, 450)">
                    <circle r="30" fill="#E0E7FF" />
                    <path d="M0,-10 L-15,5 L-10,5 L-5,10 L0,5 L5,10 L10,5 L15,5 Z" fill="#6366F1" />
                  </g>
                </g>

                {/* Animated particles */}
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={300 + Math.cos((i * Math.PI) / 4) * 200}
                    cy={300 + Math.sin((i * Math.PI) / 4) * 200}
                    r="3"
                    fill="#FDE047"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}

                {/* Tier badges around the shield */}
                <g transform="translate(380, 220)" className="animate-bounce-slow">
                  <rect
                    x="-30"
                    y="-15"
                    width="60"
                    height="30"
                    rx="15"
                    fill="#D97706"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    GOLD
                  </text>
                </g>

                <g
                  transform="translate(220, 220)"
                  className="animate-bounce-slow"
                  style={{ animationDelay: '0.5s' }}
                >
                  <rect
                    x="-35"
                    y="-15"
                    width="70"
                    height="30"
                    rx="15"
                    fill="#9333EA"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    PLATINUM
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-4">
              <Zap className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">Why Choose Kenbright 360°</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Unlock Premium Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just insurance - it&apos;s a complete rewards ecosystem designed to protect
              and reward you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Gift,
                title: 'Earn Points',
                description: 'Get rewarded for every shilling spent on insurance premiums',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Target,
                title: 'Tier Benefits',
                description: 'Climb tiers and unlock exclusive discounts up to 15%',
                color: 'from-indigo-500 to-purple-500',
              },
              {
                icon: Rocket,
                title: 'Instant Rewards',
                description: 'Redeem points instantly for premium discounts',
                color: 'from-pink-500 to-red-500',
              },
              {
                icon: Users,
                title: 'Referral Bonus',
                description: 'Earn extra points when you refer friends and family',
                color: 'from-green-500 to-teal-500',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity`}
                ></div>
                <div
                  className={`inline-flex p-3 bg-gradient-to-r ${benefit.color} rounded-xl mb-4`}
                >
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section id="tiers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Award className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Membership Tiers</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Premium Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progress through our tiers and unlock increasingly valuable rewards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  tier.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>

                <div className="p-6">
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-sm text-gray-600 mb-6">{tier.requirement}</p>

                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => router.push('/kyc')}
                    className={`w-full mt-6 px-4 py-3 bg-gradient-to-r ${tier.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                  >
                    {index === 0 ? 'Start Here' : `Unlock ${tier.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-4">
              <Shield className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">Our Products</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Insurance Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of insurance products and start earning rewards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl group-hover:from-indigo-500 group-hover:to-purple-500 transition-all">
                    <product.icon className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.category === 'Core'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {product.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full mb-4">
              <Star className="w-4 h-4 mr-2 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Customer Stories</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Thousands</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-x-16 -translate-y-16"
                aria-hidden="true"
              ></div>
              <div
                className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full translate-x-20 translate-y-20"
                aria-hidden="true"
              ></div>

              <div className="relative">
                <div className="flex justify-center mb-6" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-xl text-gray-700 text-center mb-8 italic">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </p>

                <div className="text-center">
                  <p className="font-bold text-gray-900">{currentTestimonial.name}</p>
                  <p className="text-gray-600">{currentTestimonial.role}</p>
                </div>

                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeTestimonial
                          ? 'w-8 bg-indigo-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-pressed={index === activeTestimonial}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20" aria-hidden="true"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of satisfied customers who are already enjoying premium benefits
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/kyc')}
              className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:scale-105 transition-all shadow-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Complete KYC Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/20 transition-all border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Sign In to Dashboard
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-8">
            <div className="text-white">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm opacity-80">Secure</div>
            </div>
            <div className="w-px bg-white/30" aria-hidden="true"></div>
            <div className="text-white">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
            <div className="w-px bg-white/30" aria-hidden="true"></div>
            <div className="text-white">
              <div className="text-3xl font-bold">5min</div>
              <div className="text-sm opacity-80">Setup</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">kenbright 360°</span>
              </div>
              <p className="text-sm">Kenya&apos;s premier insurance loyalty program</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Motor Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Medical Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Home Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Travel Insurance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Kenbright 360°. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 25s linear infinite reverse;
        }

        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}

//
