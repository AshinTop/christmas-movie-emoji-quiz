
/**
 * Log an event to Google Analytics
 * @param eventName The name of the event (e.g., 'level_start', 'share')
 * @param params Optional parameters to send with the event
 */
export const logEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // console.debug(`[Analytics] ${eventName}`, params);
  }
};
