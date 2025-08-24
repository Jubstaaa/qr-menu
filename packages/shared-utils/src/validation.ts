export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      errors: [{ field: fieldName, message: `${fieldName} is required` }]
    };
  }
  
  return { isValid: true, errors: [] };
};

export const validateLength = (value: string, fieldName: string, min: number, max: number): ValidationResult => {
  if (value.length < min) {
    return {
      isValid: false,
      errors: [{ field: fieldName, message: `${fieldName} must be at least ${min} characters` }]
    };
  }
  
  if (value.length > max) {
    return {
      isValid: false,
      errors: [{ field: fieldName, message: `${fieldName} must be at most ${max} characters` }]
    };
  }
  
  return { isValid: true, errors: [] };
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const combineValidationResults = (...results: ValidationResult[]): ValidationResult => {
  const allErrors = results.flatMap(result => result.errors);
  const isValid = results.every(result => result.isValid);
  
  return { isValid, errors: allErrors };
}; 