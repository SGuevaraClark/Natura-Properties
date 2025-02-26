/**
 * Handles image loading errors by setting a fallback image
 * @param {Event} e - The error event
 * @param {string} fallbackSrc - Optional custom fallback image URL
 */
export const handleImageError = (e, fallbackSrc = 'https://placehold.co/600x400') => {
  e.target.src = fallbackSrc;
  e.target.onerror = null; // Prevents infinite error loop
};

/**
 * Creates a properly formatted image URL from PocketBase
 * @param {Object} pb - PocketBase instance
 * @param {Object} record - The record containing the image
 * @param {string} filename - The filename of the image
 * @returns {string} - The formatted image URL
 */
export const getImageUrl = (pb, record, filename) => {
  if (!filename) return 'https://placehold.co/600x400';
  return pb.files.getURL(record, filename);
}; 