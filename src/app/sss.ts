function detectNumberFormat2(input: string): string {
  // Regular expression for detecting German format (e.g., 1.234,56)
  const germanRegex = /^\d{1,3}(\.\d{3})*(,\d{1,2})?$/;

  // Regular expression for detecting English format (e.g., 1,234.56)
  const englishRegex = /^\d{1,3}(\,\d{3})*(\.\d{1,2})?$/;

  // Test if the input matches the German format
  if (germanRegex.test(input)) {
    return 'German format';
  }

  // Test if the input matches the English format
  if (englishRegex.test(input)) {
    return 'English format';
  }

  // If neither matches, return invalid format
  return 'Invalid format';
}

// Test cases
console.log(detectNumberFormat2('1.234,56'));  // German format
console.log(detectNumberFormat2('1,234.56'));  // English format
console.log(detectNumberFormat2('123.56'));    // English format
console.log(detectNumberFormat2('123,56'));    // German format
console.log(detectNumberFormat2('123456'));    // Invalid format
