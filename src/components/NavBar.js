import React from 'react';
import { Link } from 'react-router-dom'

function NavBar({currentUser}){
    return (
        <div class="nav-wrapper">
            <div class="nav">
                {currentUser ? (
                <>
                        <Link className="option opt-logo" to="/">
                            I GOT NEXT
                        </Link>
                        
                        <div>
                            
                        </div>
                        <Link class="option opt-discover" to="/discover">
                            Discover
                        </Link>

                        <Link class="option opt-favorite" to="/favorites">
                            Home Courts
                        </Link>
                    
                        <Link class="option opt-profile" to="/login">
                            Profile
                        </Link>

                        <Link class="option opt-logout" to="/login">
                            Logout
                        </Link>
                </>
                ) : (
                    <>
                        <Link className="option opt-logo" to="/">
                            I GOT NEXT
                        </Link>
                        
                        <div></div>

                        <div></div>
                        
                        <Link class="option opt-discover" to="/discover">
                            Discover
                        </Link>

                        <Link class="option opt-login" to="/login">
                            Login/Signup
                        </Link>
                    
                    </>
                )}
            </div>
           
        </div>
            
    )
    
}


export default NavBar;


{/* <div class="nav-wrapper">
            <div class="nav">
                <Link className="option opt-logo" to="/">
                    I GOT NEXT
                </Link>
                
                {currentUser ? (
                    <>
                        <div>
                            
                        </div>
                        <Link class="option opt-discover" to="/discover">
                            Home Courts
                        </Link>
                        <Link class="option opt-discover" to="/discover">
                            Discover
                        </Link>
                    
                        <Link class="option opt-login" to="/login">
                            Profile
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
        </div> */}