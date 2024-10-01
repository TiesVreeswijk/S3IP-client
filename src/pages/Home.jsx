import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/dashboard">Go to Login</Link>
        </div>
    );
};

export default Home;