/**
 * Registration API Service
 * Handles API communication with Express server & persistent JSON data store
 */

export const submitRegistration = async (formData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Server error during submission');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Backend API connection failed, falling back to local handler:', error.message);
    
    // Fallback in-memory handler if server is not accessible
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Check if error is intentional network failure simulation or genuine offline
    if (formData.simulateError) {
      throw new Error('Simulated backend connection failure');
    }

    const registrationId = `ECELL-2026-${Math.floor(100 + Math.random() * 900)}`;
    const result = {
      success: true,
      registrationId,
      timestamp: new Date().toISOString(),
      data: {
        ...formData,
        registrationId,
      },
    };

    // Store in localStorage as fallback
    try {
      const stored = JSON.parse(localStorage.getItem('ecell_registrations') || '[]');
      stored.push(result.data);
      localStorage.setItem('ecell_registrations', JSON.stringify(stored));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }

    return result;
  }
};

export const fetchRegistrations = async () => {
  try {
    const response = await fetch('/api/registrations');
    if (!response.ok) {
      throw new Error('Failed to fetch registrations from server');
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend fetch failed, returning localStorage registrations:', error);
    const local = JSON.parse(localStorage.getItem('ecell_registrations') || '[]');
    return { success: true, count: local.length, registrations: local };
  }
};
