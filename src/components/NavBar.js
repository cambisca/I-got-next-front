import React, {useState, useEffect} from 'react';
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

    useEffect(()=> {
        fetch(`http://localhost:3000/ball_gifs`)
        .then(response => response.json())
        .then((gifsArr) => setGifs(gifsArr))
      }, [])


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

                        <div> </div>

                        <Link class="option opt-discover" to="/discover">
                            Discover
                        </Link>

                        <Link class="option opt-favorite" to="/favorites">
                            Home Courts
                        </Link>
                

                        <Link class="option opt-logout" to="/" onClick={logout}>
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

                        <div></div>
                        
                        <div></div>
                        <Modal 
                            basic
                            onClose={() => setLoginModal(false)}
                            onOpen={() => setLoginModal(true)}
                            open={loginModal}
                            size="small"
                            trigger={ 
                                <Link class="option opt-login">
                                    Login
                                </Link>
                            }
                        >
                            <Form className="login-form" onSubmit={handleSubmit}>
                                <Form.Field>
                                        <label>Username</label>
                                        <input 
                                            placeholder='Username' 
                                            type="text"
                                            name="username"
                                            onChange={handleChange}
                                            value={loginData.username}
                                        />
                                        { errors.map((error) => (
                                            <p style={{ color: "red" }} key={error}>
                                                {error}
                                            </p>
                                        ))}
                                </Form.Field> 
                                <Form.Field>
                                    <label>Password</label>
                                    <input 
                                        placeholder='Password' 
                                        type="text"
                                        name="password"
                                        onChange={handleChange}
                                        value={loginData.password}
                                    />
                                    { errors.map((error) => (
                                        <p style={{ color: "red" }} key={error}>
                                            {error}
                                        </p>
                                    ))}
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                                <Link className="signup-option" to="/signup">
                                    Sign up 
                                </Link>
                            </Form>
                        </Modal>
                            
                    
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