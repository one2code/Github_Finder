import { createContext, useReducer } from "react";
import githubReducer from "./GitHubReducer";

const GithubContext = createContext();

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

	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
