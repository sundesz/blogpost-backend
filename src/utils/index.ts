/**
 * Checks if text is string or not
 * @param text
 * @returns boolean
 */
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

/**
 * Checks if text is boolean or not
 * @param text
 * @returns boolean
 */
const isBoolean = (text: unknown): text is boolean => {
  return typeof text === 'boolean';
};

/**
 * Parse user input to boolean value
 * @param text
 * @returns boolean
 */
const parseBoolean = (text: unknown): boolean => {
  return (isString(text) && text === 'true') || (isBoolean(text) && text);
};

export { parseBoolean };
