function detectNumberFormat(input: string): string {
  // Case when both comma and period are present
  if (input.includes('.') && input.includes(',')) {
    const lastComma = input.lastIndexOf(',');
    const lastDot = input.lastIndexOf('.');

    // If the comma appears after the last period, it's likely German format
    if (lastComma > lastDot) {
      return 'German format';
    }
    // If the period appears after the last comma, it's likely English format
    else if (lastDot > lastComma) {
      return 'English format';
    }
  }

  // Case when only comma is present, it's likely German format
  if (input.includes(',') && !input.includes('.')) {
    return 'German format';
  }

  // Case when only period is present, it's likely English format
  if (input.includes('.') && !input.includes(',')) {
    return 'English format';
  }

  // If neither is found, it's an invalid format
  return 'Invalid format';
}

// Test cases
console.log(detectNumberFormat('1.234,56'));  // German format
console.log(detectNumberFormat('1,234.56'));  // English format
console.log(detectNumberFormat('123.56'));    // English format
console.log(detectNumberFormat('123,56'));    // German format
console.log(detectNumberFormat('123456'));    // Invalid format
