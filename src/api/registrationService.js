/**
 * Registration API Service
 * Interacts directly with the backend database API.
 * Guarantees that registrations are written to persistent storage before returning success.
 */

export const submitRegistration = async (formData) => {
  console.log('[Registration Service] Submitting form data to backend API...');
  
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Server returned status ${response.status}`;
    console.error('[Registration Service] Backend submission failed:', errorMessage);
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log('[Registration Service] Backend confirmed registration success:', data.registrationId);
  return data;
};

export const fetchRegistrations = async () => {
  console.log('[Registration Service] Fetching current registrations from backend...');
  
  const response = await fetch('/api/registrations', {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Failed to fetch registrations (Status ${response.status})`;
    console.error('[Registration Service] Fetch registrations error:', errorMessage);
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log(`[Registration Service] Successfully retrieved ${data.count || 0} registration(s) from database`);
  return data;
};
