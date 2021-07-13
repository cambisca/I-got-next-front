import "semantic-ui-css/semantic.min.css";
import { Link } from 'react-router-dom'

function Homepage({currentUser}){
    

    return (
        <div class="home-wrapper">
            <div class="homepage-login" >
                {currentUser ? null : 
                    <Link to="/login" class="login-button homepage-login-button"> 
                        Login
                    </Link>   
                }

            </div>
        </div>
    )
}

export default Homepage;