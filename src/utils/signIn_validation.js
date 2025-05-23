const VALIDATORS = {
  email: validateEmail,
  password: validatePassword
}

export const validateInput = (field, input) => {
  let errors = {}
  const validate = VALIDATORS[field]
  const value = cleanInput(input)
  if (validate) validate(errors, value)
  return errors
}

function validateEmail(errors, input) {
  errors.email = isValidEmail(input) ? false : 'Email is invalid.'
}

function validatePassword(errors, input) {
  errors.password = isValidPassword(input) ? false : 'Password is invalid.'
}

/**
 * Cleans up a string by trimming leading/trailing whitespace and replacing
 * multiple consecutive spaces with a single space.
 *
 * @param {string} input - The string to be cleaned.
 * @returns {string} - A cleaned version of the input string with extra spaces removed.
 *
 * @example
 * cleanInput("  Hello   World  ") // "Hello World"
 * cleanInput("  JavaScript  is  fun!  ") // "JavaScript is fun!"
 * cleanInput(" No extra spaces ") // "No extra spaces"
 * cleanInput("     ") // ""
 */
function cleanInput(input) {
  return input.trim().replace(/\s+/g, ' ')
}

/**
 * Validates whether a password is strong enough.
 * Allows letters, numbers, and most common special characters.
 *
 * @param {string} input - The password string to be checked.
 * @returns {boolean} - Returns `true` if the password is valid, `false` otherwise.
 *
 * @example
 * isValidPassword("P@ssw0rd!") // true
 * isValidPassword("abc123")    // false (too short or too weak)
 */
function isValidPassword(input) {
  if (input.length < 8) return false; // Enforce minimum length
  return /^[\w!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]+$/.test(input);
}

function isValidEmail(input) {
  if (input.length == 0) {
    return true
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
}
