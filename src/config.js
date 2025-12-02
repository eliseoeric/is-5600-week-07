// Base URL for the Node API. Update if your server runs on a different host/port.
export const BASE_URL = (typeof window !== 'undefined' && window.location.hostname !== 'localhost')
	? `http://${window.location.hostname}:3080`
	: 'http://localhost:3080';