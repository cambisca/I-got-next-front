import React, {useState, useEffect} from 'react';
import Login from './Login'
import { Link, useHistory } from 'react-router-dom'
import {Modal, Button, Form} from 'semantic-ui-react'

function NavBar({currentUser, setCurrentUser}){
    const [loginModal, setLoginModal] = useState(false)
    const [loginData, setLoginData] = useState({
        username: "", 
        password: "",
    });

    const [gifs, setGifs] = useState([])
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function logout(){
        localStorage.removeItem("token")
        setCurrentUser(null)
        setLoginData({
            username: "",
            password: ""
        })
    }

    function handleChange(e){
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }


    function handleSubmit(e){
        e.preventDefault()

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            })
            .then((response) => {
                return response.json().then(data => {
                    if (response.ok) {
                        return data 
                    } else {
                        throw data
                    }
                })
            })
            .then((data) => {
                const { user, token } = data 
                localStorage.setItem("token", token)
                setCurrentUser(user);
                history.push("/")
            })
            .catch((error) => {
                setErrors(error.errors)
            })
    }

    let navIndicator;
    if (currentUser) {
        navIndicator = "nav"
    } else {
        navIndicator = "nav-login"
    }

    return (
        <div class="nav-wrapper">
            <div class={navIndicator}>
                {currentUser ? (
                <>
                        <Link className="option" to="/" id="opt-logo">
                            IGN
                        </Link>


                        <Link class="option" to="/discover" id="opt-discover">
                            D
                        </Link>

                

                        <Link class="option" to="/favorites" id="opt-home-court">
                            HC
                        </Link>
                

                       

                        <Link class="option" to="/" onClick={logout} id="opt-logout">
                            Logout
                        </Link>

                       
                </>
                ) : (
                    <>
                        <Link className="option opt-logo" to="/" id="opt-logo">
                            I GOT NEXT
                        </Link>
                        
                        <Link to="/login" class="option" id="opt-logo">
                            Log in
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