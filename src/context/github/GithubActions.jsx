const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// The async function accesses the Github url stored in the .env file and makes a request to Github.com/Users
// An authorization header is sent with the Github token to increase the rate-limit of requests
// The returned data from the request is passed into the setUsers state
export const searchUsers = async (text) => {
	// Allows for dynamic search functionality
	const params = new URLSearchParams({
		q: text,
	});

	const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
		headers: { Authorization: `token ${GITHUB_TOKEN}` },
	});
	const { items } = await response.json();
	// Takes in an action object and sends the data from the api to the reducer function
	return items;
};

// Returns search results for a single user
export const getUser = async (login) => {
	const response = await fetch(`${GITHUB_URL}/users/${login}`, {
		headers: { Authorization: `token ${GITHUB_TOKEN}` },
	});

	if (response.status === 404) {
		window.location = "/notfound";
	} else {
		const data = await response.json();
		// Takes in an action object and sends the data from the api to the reducer function
		return data;
	}
};
// Fetch user repos
export const getUserRepos = async (login) => {
	const params = new URLSearchParams({
		sort: "created",
		per_page: 10,
	});

	const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
		headers: { Authorization: `token ${GITHUB_TOKEN}` },
	});
	const data = await response.json();
	// Takes in an action object and sends the data from the api to the reducer function
	return data;
};
