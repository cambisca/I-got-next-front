import "semantic-ui-css/semantic.min.css";
import { Link } from 'react-router-dom'
import { Button } from "semantic-ui-react";

function Homepage({currentUser}){
    

    return (
        <div class="home-wrapper">
            <div class="homepage-filler" align="center"></div>

            <div class="home-page-gif">
                <img class="home-page-gif" src="https://i.pinimg.com/originals/fd/04/54/fd0454c0d852df7c1b70ab8caa394632.gif"></img>
            </div>

            <div class="homepage-filler" align="center">
                {currentUser ? null : <Button id="login-button">
                    <Link to="/login" className="login-button-text"> Login </Link>
                </Button>}
            </div>
        </div>
    )
}

export default Homepage;