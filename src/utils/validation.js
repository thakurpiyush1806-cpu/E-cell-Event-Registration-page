/**
 * Validation utility for E-Cell UIET KUK Startup Pitch Registration Form
 */

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  // Indian 10-digit mobile number validation
  const cleanPhone = String(phone).replace(/\s+/g, '').replace(/[-()]/g, '');
  const re = /^[6-9]\d{9}$/;
  return re.test(cleanPhone);
};

export const validateFormField = (name, value) => {
  const val = String(value || '').trim();

  switch (name) {
    case 'fullName':
      if (!val) return 'Please enter your full name.';
      if (val.length < 3) return 'Name must contain at least 3 characters.';
      return '';

    case 'email':
      if (!val) return 'Please enter a valid email address.';
      if (!validateEmail(val)) return 'Please enter a valid email address.';
      return '';

    case 'phone':
      if (!val) return 'Please enter a valid 10-digit phone number.';
      if (!validatePhone(val)) return 'Please enter a valid 10-digit phone number.';
      return '';

    case 'teamName':
      if (!val) return 'Team name is required.';
      if (val.length < 2) return 'Team name must contain at least 2 characters.';
      return '';

    case 'startupName':
      if (!val) return 'Startup/Idea name is required.';
      return '';

    case 'description':
      if (!val) return 'Idea description is required.';
      if (val.length < 20) return 'Idea description must contain at least 20 characters.';
      if (val.length > 500) return 'Idea description cannot exceed 500 characters.';
      return '';

    default:
      return '';
  }
};

export const validateForm = (formData) => {
  const errors = {};
  const fields = ['fullName', 'email', 'phone', 'teamName', 'startupName', 'description'];

  fields.forEach((field) => {
    const error = validateFormField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
