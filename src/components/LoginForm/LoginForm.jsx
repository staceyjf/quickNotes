import { useState } from 'react'; 
import * as usersService from '../../utilities/users-service'; 

function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' }); 
    const [error, setError] = useState(''); 

    function handleChange(evt) { 
        setCredentials({ 
            ...credentials, [evt.target.name]: evt.target.value 
        }); 
        setError(''); }

    async function handleSubmit(evt) { 
        // Prevent form from being submitted to the server 
        evt.preventDefault(); 
        try { // The promise returned by the signUp service method 
            // will resolve to the user object included in the 
            // payload of the JSON Web Token (JWT) 
            const user = await usersService.login(credentials); 
            setUser(user); 
        } catch { 
            setError('Log In Failed - Try Again'); 
        } 
    } 

    return (
        <>
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}> 
                Email <input type="text" name="email" value={credentials.email} onChange={handleChange} required /> 
                Password <input type="password" name="password" value={credentials.password} onChange={handleChange} required /> 
                <button type="submit">LOG IN </button>
            </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
        </>
    ); 
}

export default LoginForm;




     
        

        


