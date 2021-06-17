import React, {useState} from 'react'  
import { useHistory, Link} from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

function Signup({setUser}){
    const [signUpFormData, setSignUpFormData] = useState({
        username: "",
        password: "", 

    })
    const { username, password } = signUpFormData

    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpFormData),
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((responseData) => {
                        throw responseData;
                    });
                }
            })
            .then((data) => {
                const { user, token } = data 
                localStorage.setItem("token", token)
                setUser(user);
                history.push("/discover")
            })
            .catch((responseData) => {
                setErrors(responseData.errors)
            })
    }

    function handleChange(e){
        setSignUpFormData({
            ...signUpFormData, 
            [e.target.name]: [e.target.value],
        });
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
                value={signUpFormData.username}
            />
            <label id="username">Password</label>
            <input 
                class="login-inputs"
                placeholder='Password' 
                type="password"
                name="password"
                onChange={handleChange}
                value={signUpFormData.password}
            />
            <button type='submit' class="login-button">Submit</button>
            <Link id="opt-signup" to="/login">
                Already have an account? 
            </Link>
        </form>

        </div>

/* <Form className="login-form" onSubmit={handleSubmit}>
<Form.Field className="login-inputs">
        <label id="username-label">Username</label>
        <input 
            placeholder='Username' 
            type="text"
            name="username"
            onChange={handleChange}
            value={signUpFormData.username}
        />
</Form.Field> 
<Form.Field className="login-inputs">
    <label id="password-label">Password</label>
    <input 
        placeholder='Password' 
        type="password"
        name="password"
        onChange={handleChange}
        value={signUpFormData.password}
    />
    {/* { errors ? errors.map((error) => (
        <p style={{ color: "red" }} key={error}>
            {error}
        </p>
    )) : null } 
</Form.Field>
<Button type='submit' id="login-button">submit</Button>
<Link id="opt-signup" to="/login">
    Already have an account? 
</Link>
</Form> */
    )
}

export default Signup;