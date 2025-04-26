
import { CreateUserForm } from "../../components/CreateUserForm/CreateUserForm";
import {UsersList} from "../../components/UserList/UserList";
import "./Home.scss"

export const Home = () => {
	return <div className="home">
    TEST
    <CreateUserForm />
    <UsersList />
  </div>;
};
