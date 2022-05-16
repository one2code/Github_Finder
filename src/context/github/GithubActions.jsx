import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

// The async function accesses the Github url stored in the .env file and makes a request to Github.com/Users
// An authorization header is sent with the Github token to increase the rate-limit of requests
// The returned data from the request is passed into the setUsers state
export const searchUsers = async (text) => {
	// Allows for dynamic search functionality
	const params = new URLSearchParams({
		q: text,
	});
    // Axios fetch returns an items array from data without the need to send an authorization header in an async function, and without the need to await response.json
    // The base url is also more condensed because it is passed into const github beforehand
	const response = await github.get(`/search/users?${params}`)
    return response.data.items
};

// Get user and repositories

export const getUserAndRepos = async(login) => {
    // Promise.all allows for an array of requests to be made. In this case, a request for user and a request for repos
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])
    // Return an object of the request
    return {user: user.data, repos: repos.data}
}

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
