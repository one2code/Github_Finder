import { useEffect, useState } from "react";
import Spinner from '../layout/Spinner'

function UserResults() {
	// Initialize our state for users and loading
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchUsers();
	}, []);
	// The async function accesses the Github url stored in the .env file and makes a request to Github.com/Users
	// An authorization header is sent with the Github token to increase the rate-limit of requests
	// The returned data from the request is passed into the setUsers state
	const fetchUsers = async () => {
		const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
			headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
		});
		const data = await response.json();
		setUsers(data);
		//setloading returns false after the response is received
		setLoading(false);
	};

    //Checks the loading state and returns a list of Github users in grid columns, designed responsively
	if (!loading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {/*Maps over our user array in state, and returns each individual user with their login name retrieved from the data in our fetch request */}
				{users.map((user) => (
					<h3>{user.login}</h3>
				))}
			</div>
		);
	} else {
        // Displays the spinner.gif from the Spinner component
		return <h3><Spinner/></h3>;
	}
}
export default UserResults;
