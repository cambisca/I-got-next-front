import React, {useState} from 'react'  
import { useHistory} from 'react-router-dom'

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
                setUser(user);
                history.push("/")
            })
            .catch((error) => {
                setErrors(error.errors)
            })
    }

    function handleChange(e){
        setSignUpFormData({
            ...signUpFormData, 
            [e.target.name]: [e.target.value],
        });
    }
    
    return (
        <div class="signup-wrapper">
            <div class="signup-box">
                <form onSubmit={handleSubmit} class="signup-form">
                    <label>Username</label>
                    <input
                        type="text" 
                        name="username"
                        autoComplete="off"
                        value={username}
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChange}
                    />

                    { errors.map((error) => (
                        <p style={{ color: "red" }} key={error}>
                            {error}
                        </p>
                    ))}

                    <input type="submit" value="Signup" />
                </form>
            </div>
        </div>
    )
}

export default Signup;