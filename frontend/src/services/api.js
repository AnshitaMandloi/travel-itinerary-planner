const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Fetch backend status and Gemini configuration state.
 */
export async function getApiStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/itinerary/status`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend status check failed:', err);
    return { api_key_configured: false, active_model: 'unknown', error: err.message };
  }
}

/**
 * Fetch sample preset travel preferences for quick one-click testing.
 */
export async function getSamplePreferences() {
  try {
    const res = await fetch(`${API_BASE}/api/itinerary/sample-preferences`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch sample preferences:', err);
    return [];
  }
}

/**
 * Send travel preferences to backend to generate structured day-by-day itinerary.
 * @param {Object} preferences - Travel preferences object
 * @param {string} [customApiKey] - Optional client-supplied Gemini API key
 */
export async function generateItinerary(preferences, customApiKey = '') {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (customApiKey && customApiKey.trim()) {
    headers['x-gemini-api-key'] = customApiKey.trim();
  }

  const response = await fetch(`${API_BASE}/api/itinerary/generate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    let errorDetail = 'Failed to generate itinerary';
    try {
      const errorJson = await response.json();
      errorDetail = errorJson.detail || errorDetail;
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }

  return await response.json();
}
