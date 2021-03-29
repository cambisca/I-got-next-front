import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

function Login({setCurrentUser}){
    const [gifs, setGifs] = useState([])
    const [loginData, setLoginData] = useState({
        username: "", 
        password: "",
    });
    const [errors, setErrors] = useState([])
    console.log(errors)

    const history = useHistory()

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
            .then((user) => {
                    setCurrentUser(user);
                    history.push("/")
            })
            .catch((error) => {
                setErrors(error.errors)
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
                        { errors.map((error) => (
                            <p style={{ color: "red" }} key={error}>
                                {error}
                            </p>
                        ))}
                        <input type="submit" value="Login" className='input-button' />
                </form>
            </div>
            <div class="box-3"> </div>
            <div class="box-4"> </div>
            <div class="box-5"> </div>
            <div class="box-6"> </div>
            <div class="box-7"> 
                <img src="https://media4.giphy.com/media/Woi5vL1MOxSmrp5Umh/giphy.gif"></img>
            </div>
            <div class="box-8"> </div>
            <div class="box-9"> </div>

        </div>
    )
}

export default Login;


// style={{backgroundImage: `url(${gifs[rand(1...19)]})`}}