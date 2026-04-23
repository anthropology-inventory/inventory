/**
 * @file locationFormatter.js
 * @description Utility functions for formatting and managing location data across the application.
 * Handles both new structured location format (object) and legacy string format.
 */

/**
 * Formats location data for display in the UI.
 * Handles both new structured format (object with cabinet, shelf, drawer)
 * and legacy string format for backward compatibility.
 *
 * @param {string|object} location - The location data to format
 * @returns {string} - Formatted location string for display
 *
 * @example
 * // New structured format
 * formatLocation({ cabinet: 'Cabinet 1', shelf: 'Shelf 3' })
 * // Returns: "Cabinet 1 - Shelf 3"
 *
 * // New structured format with drawer
 * formatLocation({ cabinet: 'Cabinet 2', drawer: 'Drawer 5' })
 * // Returns: "Cabinet 2 - Drawer 5"
 *
 * // Legacy string format
 * formatLocation('Cabinet 1, Row 3')
 * // Returns: "Cabinet 1, Row 3"
 *
 * // Null or empty
 * formatLocation(null)
 * // Returns: "N/A"
 */
export function formatLocation(location) {
  if (!location) return 'N/A'

  // Handle new structured location format (object)
  if (typeof location === 'object') {
    if (location.cabinet && location.shelf) {
      return `${location.cabinet} - Shelf ${location.shelf}`
    } else if (location.cabinet && location.drawer) {
      return `${location.cabinet} - ${location.drawer}`
    }
    return 'N/A'
  }

  // Handle legacy string format for backward compatibility
  if (typeof location === 'string') {
    return location
  }

  return 'N/A'
}

/**
 * Validates if a location object has valid cabinet and shelf/drawer values.
 *
 * @param {object} location - The location object to validate
 * @returns {boolean} - True if location is valid, false otherwise
 *
 * @example
 * isValidLocation({ cabinet: 'Cabinet 1', shelf: 'Shelf 3' })
 * // Returns: true
 *
 * isValidLocation({ cabinet: 'Cabinet 1', shelf: null })
 * // Returns: false
 */
export function isValidLocation(location) {
  if (!location || typeof location !== 'object') return false

  const hasValidCabinet = location.cabinet && typeof location.cabinet === 'string'
  const hasValidShelf = location.shelf && typeof location.shelf === 'string'
  const hasValidDrawer = location.drawer && typeof location.drawer === 'string'

  // Must have cabinet AND (shelf OR drawer)
  return hasValidCabinet && (hasValidShelf || hasValidDrawer)
}

/**
 * Extracts the location type from a location object.
 *
 * @param {object} location - The location object
 * @returns {string|null} - 'cabinet-shelf', 'cabinet-drawer', or null
 *
 * @example
 * getLocationType({ cabinet: 'Cabinet 1', shelf: 'Shelf 3' })
 * // Returns: 'cabinet-shelf'
 */
export function getLocationType(location) {
  if (!location || typeof location !== 'object') return null

  if (location.cabinet && location.shelf) return 'cabinet-shelf'
  if (location.cabinet && location.drawer) return 'cabinet-drawer'

  return null
}
