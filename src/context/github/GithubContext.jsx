import { createContext, useReducer } from "react";
import githubReducer from "./GitHubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    // Initialize our state for users and loading
	const initialState = {
		users: [],
		loading: false
	}

	// The useReducer function takes in two arguments: the githubReducer function imported from GithubReducer and the initial state
	const [state, dispatch] = useReducer(githubReducer, initialState)
	
// The async function accesses the Github url stored in the .env file and makes a request to Github.com/Users
	// An authorization header is sent with the Github token to increase the rate-limit of requests
	// The returned data from the request is passed into the setUsers state
	

	const fetchUsers = async () => {
		setLoading()
		
		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: { Authorization: `token ${GITHUB_TOKEN}` },
		});
		const data = await response.json();
		// Takes in an action object and sends the data from the api to the reducer function
		dispatch({
			type: 'GET_USERS',
			payload: data,
		})
	};

	const setLoading = () => dispatch({type: 'SET_LOADING'})
    return <GithubContext.Provider value = {{users: state.users, loading: state.loading, fetchUsers}}>
        {children}
    </GithubContext.Provider>

   
};

export default GithubContext
