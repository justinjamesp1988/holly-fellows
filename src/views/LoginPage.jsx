import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '../store/usersSlice.js';
import { auth } from '../firebase/config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} 
from "firebase/auth";

function LoginPage() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
  }

  onAuthStateChanged(auth, (user) => {
  if (user) {
    dispatch(setUser({id: user.uid, email: user.email}));
  } else {
    dispatch(setUser(null));
  }
  if(isLoading) {
    setIsLoading(false);
  }
});

   const handlePassowrdReset = () => {
    const email = prompt('please enter the email address.')
    sendPasswordResetEmail(auth, email);
    alert('please check you email inbox for reset the password!')
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .catch((error) => {
      setError(error.message);
    });
  }

  const handleLogin = (e) => {
     e.preventDefault();
    setError('');

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .catch((error) => {
        setError(error.message)
      });
  }

  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input type="text" name="email" onChange={(e) => handleInputChange(e)} placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input type="password" name="password" onChange={(e) => handleInputChange(e)} placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button className="active btn btn-block" onClick={(e) => handleLogin(e)}>Login</button>
                    : 
                    <button className="active btn btn-block" onClick={(e) => handleSignUp(e)}>Sign Up</button>
                  }
                  {
                    error && 
                    <div className='error'>{error}</div>
                  }
                  <p className="forgot-password" onClick={() => handlePassowrdReset()}>Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  