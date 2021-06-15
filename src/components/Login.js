import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

function Login({setCurrentUser}){
    // const [gifs, setGifs] = useState([])
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
                console.log(response)
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
                console.log(data)
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
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Field className="login-inputs">
                        <label id="username-label">Username</label>
                        <input 
                            placeholder='Username' 
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={loginData.username}
                        />
                </Form.Field> 
                <Form.Field className="login-inputs">
                    <label id="password-label">Password</label>
                    <input 
                        placeholder='Password' 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={loginData.password}
                    />
                    {/* { errors ? errors.map((error) => (
                        <p style={{ color: "red" }} key={error}>
                            {error}
                        </p>
                    )) : null } */}
                </Form.Field>
                <button type='submit' id="login-button">Log in</button>
                <Link id="opt-signup" to="/signup">
                    Sign up 
                </Link>
            </Form>

        </div>
        
    )
        // <div class="login-wrapper">
        //     <div class="box-1"> </div>
        //     <div class="login-form-box">
        //         <form class="login-form" onSubmit={handleSubmit}>
        //             <h1 > Login </h1>
        //                 <label htmlFor="username">Username</label>
        //                 <input
        //                     type="text"
        //                     name="username"
        //                     value={FormData.username}
        //                     onChange={handleChange}
        //                 />

        //                 <label htmlFor="password">Password</label>
        //                 <input
        //                     type="text"
        //                     name="password"
        //                     value={FormData.password}
        //                     onChange={handleChange}
        //                 />
        //                 { errors.map((error) => (
        //                     <p style={{ color: "red" }} key={error}>
        //                         {error}
        //                     </p>
        //                 ))}
                        
        //                 <input type="submit" value="Login" className='input-button' />
        //                 <Link className="signup-option" to="/signup">
        //                     Sign up 
        //                 </Link>
        //         </form>
        //     </div>
            

        // </div>
    
}

export default Login;
