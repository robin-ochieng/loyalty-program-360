'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Phone,
  Calendar,
  Globe,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AuthContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams?.get('mode');
  const [isSignUp, setIsSignUp] = useState(modeParam === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    setIsSignUp(modeParam === 'signup');
  }, [modeParam]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^(\+254|0)[17]\d{8}$/.test(phone);

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };
  const getPasswordStrengthColor = () => {
    const s = passwordStrength(formData.password);
    if (s === 0) return 'bg-gray-200';
    if (s === 1) return 'bg-red-500';
    if (s === 2) return 'bg-yellow-500';
    if (s === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };
  const getPasswordStrengthText = () => {
    const s = passwordStrength(formData.password);
    if (s === 0) return '';
    if (s === 1) return 'Weak';
    if (s === 2) return 'Fair';
    if (s === 3) return 'Good';
    return 'Strong';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (isSignUp) {
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';

      if (!formData.fullName) newErrors.fullName = 'Full name is required';

      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      else if (!validatePhone(formData.phoneNumber))
        newErrors.phoneNumber = 'Invalid Kenyan phone number';

      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

      if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    const supabase = createClient();
    try {
      if (isSignUp) {
        const { data: signUpData, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { emailRedirectTo: undefined },
        });
        if (error) throw error;
        // Create profile row (best-effort, non-blocking if fails)
        try {
          const userId = signUpData.user?.id;
          if (userId) {
            await supabase.from('profiles').insert([
              {
                id: userId,
                full_name: formData.fullName,
                phone_number: formData.phoneNumber,
                date_of_birth: formData.dateOfBirth,
              },
            ]);
          }
        } catch (profileErr) {
          // swallow profile creation errors; user still signed in
          console.warn('Profile creation failed', profileErr);
        }
        setSuccess('Account created. You are now signed in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        setSuccess('Signed in successfully.');
      }
      // redirect logic
      const redirectTarget = searchParams?.get('redirect') || '/kyc';
      // small delay so user sees success flash
      setTimeout(() => {
        window.location.href = redirectTarget;
      }, 400);
    } catch (err: unknown) {
      if (typeof err === 'object' && err && 'message' in err) {
        setError(String((err as { message?: unknown }).message) || 'Authentication failed.');
      } else {
        setError('Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter') => {
    setSocialLoading(provider);
    setError(null);
    setSuccess(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSuccess(`Mock: would sign in with ${provider}.`);
    } catch {
      setError(`Failed to start ${provider} sign in (mock).`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white/60">
        <div className="w-full max-w-md">
          {/* Logo (not a navbar) */}
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-70 animate-pulse" />
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              kenbright 360°
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-gray-600">
              {isSignUp
                ? 'Start your journey to premium insurance rewards'
                : 'Sign in to access your insurance dashboard'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading || socialLoading !== null}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all group"
            >
              {socialLoading === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.5c-.2 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3 14.6 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.7 12 20.7c7.1 0 9.3-5 8.6-8.5z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900">
                    Continue with Google (mock)
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading || socialLoading !== null}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all group"
            >
              {socialLoading === 'facebook' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fill="#1877F2"
                      d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900">
                    Continue with Facebook (mock)
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialLogin('twitter')}
              disabled={loading || socialLoading !== null}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all group"
            >
              {socialLoading === 'twitter' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fill="#000"
                      d="M13.1 10.8L20.7 2h-1.8l-6.2 7.1L8 2H2l8.1 11.5L2 22h1.8l6.7-7.6L16 22h6l-8.9-11.2z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900">
                    Continue with X (mock)
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+2547XXXXXXXX"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              {isSignUp && formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Password strength</span>
                    <span className="text-xs font-medium text-gray-700">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrengthColor()} transition-all`}
                      style={{ width: `${(passwordStrength(formData.password) / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {isSignUp && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

            {error && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (isSignUp && !agreedToTerms)}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create account' : 'Sign in'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccess(null);
                setErrors({});
              }}
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Section - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        <div className="relative z-10 max-w-md text-white text-center">
          <div className="mb-8">
            <svg viewBox="0 0 400 400" className="w-full h-auto animate-float">
              <defs>
                <linearGradient id="authGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <g transform="translate(200, 200)">
                <circle r="100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="5 10"
                  className="animate-spin-slow"
                />
                <circle
                  r="140"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="10 5"
                  className="animate-spin-reverse"
                />
                <path
                  d="M-40 -20 Q0 -60 40 -20 Q60 0 0 70 Q-60 0 -40 -20 Z"
                  fill="url(#authGradient)"
                  className="animate-pulse-slow"
                />
                <text
                  x="0"
                  y="-10"
                  textAnchor="middle"
                  fill="#7C3AED"
                  fontSize="24"
                  fontWeight="bold"
                >
                  360°
                </text>
                <path
                  d="M-60 10 Q0 40 60 10"
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {isSignUp ? 'Join 50,000+ Members' : 'Welcome to Your Benefits'}
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            {isSignUp
              ? 'Get instant access to exclusive insurance rewards and save up to 15% on premiums'
              : 'Access your personalized insurance dashboard and track your rewards'}
          </p>
          <div className="space-y-4">
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-yellow-400 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Secure Platform</div>
                <div className="text-sm text-indigo-200">Bank-level encryption</div>
              </div>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Globe className="w-8 h-8 text-green-400 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Trusted Nationwide</div>
                <div className="text-sm text-indigo-200">Kenya&apos;s #1 insurance program</div>
              </div>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Premium Rewards</div>
                <div className="text-sm text-indigo-200">Earn points on every purchase</div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-indigo-200">
              © {new Date().getFullYear()} Kenbright 360°. All rights reserved.
            </p>
          </div>
        </div>
      </div>

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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 25s linear infinite reverse;
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
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}
    >
      <AuthContent />
    </Suspense>
  );
}
