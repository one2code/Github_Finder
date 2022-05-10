import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    // Initialize our state for users and loading
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
// The async function accesses the Github url stored in the .env file and makes a request to Github.com/Users
	// An authorization header is sent with the Github token to increase the rate-limit of requests
	// The returned data from the request is passed into the setUsers state
	

	const fetchUsers = async () => {
		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: { Authorization: `token ${GITHUB_TOKEN}` },
		});
		const data = await response.json();
		setUsers(data);
		//setloading returns false after the response is received
		setLoading(false);
	};

    return <GithubContext.Provider value = {{users, loading, fetchUsers}}>
        {children}
    </GithubContext.Provider>

   
};

export default GithubContext
