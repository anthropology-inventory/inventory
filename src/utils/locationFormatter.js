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
 * // Drawer-only format
 * formatLocation({ drawer: 'Drawer 7' })
 * // Returns: "Drawer 7"
 *
 * // Legacy string format
 * formatLocation('Cabinet 1, Row 3')
 * // Returns: "Cabinet 1, Row 3"
 *
 * // Null or empty
 * formatLocation(null)
 * // Returns: "N/A"
 */
export function normalizeLocation(location) {
  if (!location) return null

  if (typeof location === 'object' && !Array.isArray(location)) {
    return location
  }

  if (typeof location === 'string') {
    const trimmedLocation = location.trim()

    if (!trimmedLocation || trimmedLocation === '[object Object]') {
      return null
    }

    if (
      (trimmedLocation.startsWith('{') && trimmedLocation.endsWith('}')) ||
      (trimmedLocation.startsWith('"') && trimmedLocation.endsWith('"'))
    ) {
      try {
        return normalizeLocation(JSON.parse(trimmedLocation))
      } catch {
        return trimmedLocation
      }
    }

    return trimmedLocation
  }

  return null
}

export function formatLocation(location) {
  const normalizedLocation = normalizeLocation(location)

  if (!normalizedLocation) return 'N/A'

  // Handle new structured location format (object)
  if (typeof normalizedLocation === 'object') {
    if (normalizedLocation.cabinet && normalizedLocation.shelf) {
      const shelfValue = String(normalizedLocation.shelf)
      const shelfLabel = shelfValue.startsWith('Shelf') ? shelfValue : `Shelf ${shelfValue}`
      return `${normalizedLocation.cabinet} - ${shelfLabel}`
    }

    if (normalizedLocation.cabinet && normalizedLocation.drawer) {
      return `${normalizedLocation.cabinet} - ${normalizedLocation.drawer}`
    }

    if (normalizedLocation.drawer) {
      return normalizedLocation.drawer
    }

    return 'N/A'
  }

  // Handle legacy string format for backward compatibility
  if (typeof normalizedLocation === 'string') {
    return normalizedLocation
  }

  return 'N/A'
}

/**
 * Validates if a location object has a valid drawer value or legacy cabinet + shelf/drawer values.
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
  const normalizedLocation = normalizeLocation(location)

  if (!normalizedLocation || typeof normalizedLocation !== 'object') return false

  const hasValidCabinet =
    typeof normalizedLocation.cabinet === 'string' && normalizedLocation.cabinet.trim() !== ''
  const hasValidShelf =
    typeof normalizedLocation.shelf === 'string' && normalizedLocation.shelf.trim() !== ''
  const hasValidDrawer =
    typeof normalizedLocation.drawer === 'string' && normalizedLocation.drawer.trim() !== ''

  return hasValidDrawer || (hasValidCabinet && hasValidShelf)
}

/**
 * Extracts the location type from a location object.
 *
 * @param {object} location - The location object
 * @returns {string|null} - 'drawer', 'cabinet-shelf', 'cabinet-drawer', or null
 *
 * @example
 * getLocationType({ cabinet: 'Cabinet 1', shelf: 'Shelf 3' })
 * // Returns: 'cabinet-shelf'
 */
export function getLocationType(location) {
  const normalizedLocation = normalizeLocation(location)

  if (!normalizedLocation || typeof normalizedLocation !== 'object') return null

  if (normalizedLocation.cabinet && normalizedLocation.shelf) return 'cabinet-shelf'
  if (normalizedLocation.cabinet && normalizedLocation.drawer) return 'cabinet-drawer'
  if (normalizedLocation.drawer) return 'drawer'

  return null
}
