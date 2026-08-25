import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompetitionInfo from './components/CompetitionInfo';
import WhyParticipate from './components/WhyParticipate';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { submitRegistration } from './api/registrationService';

export default function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleRegistrationSubmit = async (formData) => {
    const response = await submitRegistration(formData);
    if (response && response.success) {
      setRegistrationResult(response);
      setIsSuccess(true);
      // Smooth scroll to success card section
      setTimeout(() => {
        document.querySelector('#register-container')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      throw new Error(response.message || 'Submission failed');
    }
  };

  const handleResetRegistration = () => {
    setIsSuccess(false);
    setRegistrationResult(null);
    setTimeout(() => {
      document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-ecell-darkBg text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Page Sections */}
      <main className="flex-grow">
        <Hero />
        <CompetitionInfo />
        <WhyParticipate />

        <div id="register-container">
          {!isSuccess ? (
            <RegistrationForm onSubmitSuccess={handleRegistrationSubmit} />
          ) : (
            <SuccessMessage
              registrationResult={registrationResult}
              onReset={handleResetRegistration}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Organizer / Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
