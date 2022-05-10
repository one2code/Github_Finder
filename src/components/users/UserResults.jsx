import { useContext } from "react";
import Spinner from '../layout/Spinner'
import UserItem from '../users/UserItem'
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
	const {users, loading} = useContext(GithubContext)
	
	
	
    //Checks the loading state and returns a list of Github users in grid columns, designed responsively
	if (!loading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {/*Maps over our users array in state and returns each individual user with their login name retrieved from the data in our fetch request */}
				{users.map((user) => (
                    //  Takes the user from the map function and passes it into the UserItem component
					<UserItem key={user.id} user={user}/>
				))}
			</div>
		);
	} else {
        // Displays the spinner.gif from the Spinner component
		return <h3><Spinner/></h3>;
	}
}
export default UserResults;
