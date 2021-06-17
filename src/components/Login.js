import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'

function Login({setCurrentUser}){
    // const [gifs, setGifs] = useState([])
    const [loginData, setLoginData] = useState({
        username: "", 
        password: "",
    });
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function handleChange(e){
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    // useEffect(()=> {
    //     fetch(`http://localhost:3000/ball_gifs`)
    //     .then(response => response.json())
    //     .then((gifsArr) => setGifs(gifsArr))
    //   }, [])


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
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        console.log(data)
                        throw data
                    })
                }
            })
            .then((data) => {
                const { user, token } = data 
                localStorage.setItem("token", token)
                setCurrentUser(user);
                history.push("/discover")
            })
            .catch((data) => {
                setErrors([...errors, data.error])
            })
    }

    return (
        <div class="login-wrapper">
            <form class="login-form" onSubmit={handleSubmit}>
                <label id="username">Username</label>
                <input 
                    class="login-inputs"
                    placeholder='Username' 
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={loginData.username}
                />
                <label id="username">Password</label>
                <input 
                    class="login-inputs"
                    placeholder='Password' 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={loginData.password}
                />
                <button type='submit' class="login-button">Log in</button>
                <Link id="opt-signup" to="/signup">
                    Sign up 
                </Link>
            </form>

        </div>
        
    )
}

export default Login;
