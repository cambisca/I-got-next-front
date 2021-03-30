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
        <div class="login-wrapper">
            <div class="box-1"> </div>
                <div class="login-form-box">
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Username</label>
                            <input 
                                placeholder='Username'
                                type="text"
                                name="username"
                                value={loginData.username}
                                onchange={handleChange}
                            />
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
                </div>
            {<div class="box-7"> <img src="https://media1.giphy.com/media/gfGvtlxqgYKIEqSEdE/giphy.gif"></img> </div> }
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


// style={{backgroundImage: `url(${gifs[rand(1...19)]})`}}