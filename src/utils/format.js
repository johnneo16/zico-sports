/**
 * Format a number as Indian Rupee currency.
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

/**
 * Calculate discount percentage.
 * @param {number} price
 * @param {number|null} originalPrice
 * @returns {number|null}
 */
export const getDiscount = (price, originalPrice) => {
  if (!originalPrice) return null;
  return Math.round((1 - price / originalPrice) * 100);
};
