import { createContext, useReducer } from "react";
import githubReducer from "./GitHubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	// Initialize our state for users and loading
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	// The useReducer function takes in two arguments: the githubReducer function imported from GithubReducer and the initial state
	const [state, dispatch] = useReducer(githubReducer, initialState);

	

	
	// Returns search results for a single user
	const getUser = async (login) => {
		setLoading();

		const response = await fetch(`${GITHUB_URL}/users/${login}`, {
			headers: { Authorization: `token ${GITHUB_TOKEN}` },
		});

		if (response.status === 404) {
			window.location = "/notfound";
		} else {
			const data = await response.json();
			// Takes in an action object and sends the data from the api to the reducer function
			dispatch({
				type: "GET_USER",
				payload: data,
			});
		}
	};
		// Fetch user repos
	const getUserRepos = async (login) => {
		setLoading();

		const params = new URLSearchParams({
			sort: 'created',
			per_page: 10,
		});

		const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
			headers: { Authorization: `token ${GITHUB_TOKEN}` },
		});
		const data = await response.json();
		// Takes in an action object and sends the data from the api to the reducer function
		dispatch({
			type: "GET_REPOS",
			payload: data,
		});
	};
	//Clear users from state
	const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

	// Set Loading
	const setLoading = () => dispatch({ type: "SET_LOADING" });
	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
				clearUsers,
				getUser,
				getUserRepos
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
