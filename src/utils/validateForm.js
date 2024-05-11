function validateForm(formData, fields) {
    const errors = {};

    fields.forEach(field => {
        const { name, required, minLength, customValidation } = field;
        const value = formData.get(name);
    
        if (required && !value.trim()) {
          errors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else if (minLength && value.trim().length < minLength) {
          errors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${minLength} characters long`;
        } else if (customValidation && !customValidation(value)) {
          errors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is invalid`;
        }
      });
    
      return errors;
}

export default validateForm;