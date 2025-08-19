import {useState} from "react"
import styles from './Login.module.css'
import TextInput from "../../components/TextInput/TextInput"
import loginSchema from '../../schemas/loginSchema'
import {useFormik} from "formik"
import {login} from '../../api/internal'
import {setUser} from '../../store/userSlice'
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'

function Login(){
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [error, setError]= useState("");

   const handleLogin= async () => {
      const data ={
         username: values.username,
         password: values.password
      }
      const response = await login(data);

      if(response.status === 200){
           const user ={
             _id: response.data.user._id,
             email: response.data.user._email,
             username: response.data.user.username,
             auth: response.data.auth
           }
           dispatch(setUser(user));
           navigate('/blogs')
      }
      else if (response.code === 'ERR_BAD_REQUEST'){
          setError(response.response.data.message);
      }
   }

   const {values, touched, handleBlur, handleChange, errors} = useFormik({
      initialValues: {
          username: '',
          password: '', 
      },
      validationSchema: loginSchema,
   });

   return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>Log in to your account</div>
        <TextInput 
          type="text"
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username && touched.username ? 1: undefined}
          errormessage={errors.username}
        />
        <TextInput 
          type="password"
          value={values.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password && touched.password ? 1: undefined}
          errormessage={errors.password}
        />
        <button
          className={styles.logInButton}
          onClick={handleLogin}
          disabled={
            !values.username || !values.password || errors.username || errors.password
          }
        >
          Log in
        </button>
        <div className={styles.switchText} >
          Don't have an account?
          <button
            className={styles.createAccount}
            style={{marginTop: "10px"}}
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
        </div>
        {error !=="" ? <p className={styles.errorMessage}>{error}</p>: ""}
      </div>
    </div>
   );
}

export default Login