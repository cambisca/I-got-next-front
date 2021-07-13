import "semantic-ui-css/semantic.min.css";
import { Link } from 'react-router-dom'

function Homepage({currentUser}){
    

    return (
        <div class="home-wrapper">
            <div class="homepage-login" >
                {currentUser ? null : <button class="login-button homepage-login-button">
                    <Link to="/login" className="login-button-text"> 
                        Login
                    </Link>
                </button>}

            </div>
        </div>
    )
}

export default Homepage;