import "semantic-ui-css/semantic.min.css";
import { Link } from 'react-router-dom'

function Homepage({currentUser}){
    

    return (
        <div class="home-wrapper">
            <div class="title-container">
                <div class="title-box">
                    <h1 class="i-got-next i-ign"> I </h1> 
                    <h1 class="i-got-next g-ign"> GOT </h1> 
                    <h1 class="i-got-next n-ign"> NEXT </h1>
                </div>
            </div>
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