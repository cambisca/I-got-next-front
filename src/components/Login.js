import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Login({setCurrentUser}){

    const [loginData, setLoginData] = useState({
        username: "", 
        password: "",
    });

    const history = useHistory()

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
            .then(response => response.json())
            .then((user) => {
                console.log(user)
            setCurrentUser(user);
            history.push("/")
        })
    }

    return (
        <div class="login-wrapper">
            <div class="box-1"> </div>
            <div class="login-form-box">
                <form class="login-form" onSubmit={handleSubmit}>
                    <h1 > Login </h1>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={FormData.username}
                            onChange={handleChange}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name="password"
                            value={FormData.password}
                            onChange={handleChange}
                        />

                        <input type="submit" value="Login" className='input-button' />
                </form>
            </div>
            <div class="box-3"> </div>
            <div class="box-4"> </div>
            <div class="box-5"> </div>
            <div class="box-6"> </div>
            <div class="box-7"> </div>
            <div class="box-8"> </div>
            <div class="box-9"> </div>

        </div>
    )
}

export default Login;