import React, { useState } from 'react';
import { validateFormField, validateForm } from '../utils/validation';
import { User, Mail, Phone, Users, Rocket, FileText, AlertCircle, Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function RegistrationForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    teamName: '',
    startupName: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle character limit for description
    if (name === 'description' && value.length > 500) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time revalidation if field was touched
    if (touched[name]) {
      const error = validateFormField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateFormField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Touch all fields to show any missing validation errors
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      teamName: true,
      startupName: true,
      description: true,
    };
    setTouched(allTouched);

    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to first invalid field smoothly
      const firstErrorKey = Object.keys(validation.errors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    // Begin Loading Submission State
    setIsSubmitting(true);

    try {
      await onSubmitSuccess(formData);
    } catch (err) {
      console.error('Submission failed:', err);
      setServerError('Something went wrong. Your registration could not be submitted. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 bg-ecell-darkBg relative">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-ecell-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-ecell-red px-3 py-1 rounded-full bg-red-950/60 border border-red-900/60">
            Official Portal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Register for the <span className="text-ecell-red">Startup Pitch Competition</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Fill in your details and submit your startup idea.
          </p>
        </div>

        {/* Server Error Alert Card */}
        {serverError && (
          <div className="mb-8 p-5 rounded-2xl bg-red-950/80 border border-red-800 text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-base">Something went wrong.</h4>
                <p className="text-sm text-red-300 mt-0.5">{serverError}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setServerError(null)}
              className="px-4 py-2 rounded-lg bg-red-900/90 hover:bg-red-800 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Form Card Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* Grid 1: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-200">
                  Full Name <span className="text-ecell-red">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border focus:outline-none transition-all ${
                      touched.fullName && errors.fullName
                        ? 'border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20'
                        : touched.fullName && !errors.fullName && formData.fullName
                        ? 'border-emerald-500/80 focus:border-emerald-500'
                        : 'border-slate-800 focus:border-ecell-red focus:ring-2 focus:ring-ecell-red/30'
                    }`}
                  />
                  {touched.fullName && !errors.fullName && formData.fullName && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
                  )}
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
                  Email Address <span className="text-ecell-red">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="student@example.com"
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? 'border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20'
                        : touched.email && !errors.email && formData.email
                        ? 'border-emerald-500/80 focus:border-emerald-500'
                        : 'border-slate-800 focus:border-ecell-red focus:ring-2 focus:ring-ecell-red/30'
                    }`}
                  />
                  {touched.email && !errors.email && formData.email && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
                  )}
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Grid 2: Phone & Team Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-200">
                  Phone Number <span className="text-ecell-red">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="9876543210"
                    maxLength={10}
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border focus:outline-none transition-all ${
                      touched.phone && errors.phone
                        ? 'border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20'
                        : touched.phone && !errors.phone && formData.phone
                        ? 'border-emerald-500/80 focus:border-emerald-500'
                        : 'border-slate-800 focus:border-ecell-red focus:ring-2 focus:ring-ecell-red/30'
                    }`}
                  />
                  {touched.phone && !errors.phone && formData.phone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
                  )}
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Team Name */}
              <div className="space-y-2">
                <label htmlFor="teamName" className="block text-sm font-semibold text-slate-200">
                  Team Name <span className="text-ecell-red">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Innovators"
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border focus:outline-none transition-all ${
                      touched.teamName && errors.teamName
                        ? 'border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20'
                        : touched.teamName && !errors.teamName && formData.teamName
                        ? 'border-emerald-500/80 focus:border-emerald-500'
                        : 'border-slate-800 focus:border-ecell-red focus:ring-2 focus:ring-ecell-red/30'
                    }`}
                  />
                  {touched.teamName && !errors.teamName && formData.teamName && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
                  )}
                </div>
                {touched.teamName && errors.teamName && (
                  <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.teamName}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Startup / Idea Name */}
            <div className="space-y-2">
              <label htmlFor="startupName" className="block text-sm font-semibold text-slate-200">
                Startup / Idea Name <span className="text-ecell-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="startupName"
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="EcoTrack"
                  disabled={isSubmitting}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border focus:outline-none transition-all ${
                    touched.startupName && errors.startupName
                      ? 'border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20'
                      : touched.startupName && !errors.startupName && formData.startupName
                      ? 'border-emerald-500/80 focus:border-emerald-500'
                      : 'border-slate-800 focus:border-ecell-red focus:ring-2 focus:ring-ecell-red/30'
                  }`}
                />
                {touched.startupName && !errors.startupName && formData.startupName && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
                )}
              </div>
              {touched.startupName && errors.startupName && (
                <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.startupName}</span>
                </p>
              )}
            </div>

            {/* Startup Description with Live Character Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="block text-sm font-semibold text-slate-200">
                  Startup / Idea Description <span className="text-ecell-red">*</span>
                </label>
                <span
                  className={`text-xs font-mono font-medium ${
                    formData.description.length < 20
                      ? 'text-slate-400'
                      : formData.description.length >= 480
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {formData.description.length} / 500
                </span>
              </div>
              
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 text-slate-400 pointer-events-none">
                  <FileText className="w-5 h-5" />
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Describe your startup idea, the problem it solves, and your proposed solution..."
                  disabled={isSubmitting}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border focus:outline-none transition-all resize-y min-h-[120px] ${
                    touched.description && errors.description
                      ? 'border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20'
                      : touched.description && !errors.description && formData.description.length >= 20
                      ? 'border-emerald-500/80 focus:border-emerald-500'
                      : 'border-slate-800 focus:border-ecell-red focus:ring-2 focus:ring-ecell-red/30'
                  }`}
                />
              </div>

              {touched.description && errors.description && (
                <p className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-ecell-red via-red-600 to-red-700 text-white font-bold text-base shadow-glow-red hover:shadow-glow-red-lg hover:brightness-110 disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Registration</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
