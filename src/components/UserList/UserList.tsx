import { useEffect, useState } from "react";
import "./UserList.scss";
import { User } from "../../types/User";
import { ApiError } from "../../types/ApiError";
import { UserService } from "../../services/UserService";

export const UsersList = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const data = await UserService.getAll();
				setUsers(data);
			} catch (err) {
				setError(err as ApiError);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="users-display">
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.name} - {user.email}
					</li>
				))}
			</ul>
		</div>
	);
};
