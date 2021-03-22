import React from 'react';
import { Link } from 'react-router-dom'

function NavBar({currentUser}){
    return (
        <div class="nav">
            <Link className="option opt-logo" to="/">
                I GOT NEXT
            </Link>
            
            {currentUser ? (
                <>
                    <div>
                        
                    </div>
                    <Link class="option opt-discover" to="/discover">
                        Discover
                    </Link>
                
                    <Link class="option opt-login" to="/login">
                        Logout
                    </Link>
                </>
            ) : (
                <>
                    <Link class="option opt-discover" to="/discover">
                        Discover
                    </Link>

                    <Link class="option opt-login" to="/login">
                        Login
                    </Link>
                </>
            )}
            
        </div>

            
    )
    
}


export default NavBar;