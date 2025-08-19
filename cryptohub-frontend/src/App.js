import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import styles from './App.module.css';
import Protected from './components/Protected/Protected';
import Error from "./pages/Error/Error";
import Login from './pages/Login/Login'
import { useSelector } from 'react-redux';
import Signup from './pages/Signup/Signup';
import Crypto from './pages/Crypto/Crypto';
import Blog from "./pages/Blog/Blog"
import SubmitBlog from './pages/SubmitBlog/SubmitBlog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import UpdateBlog from './pages/UpdateBlog/UpdateBlog';

import Loader from "./components/Loader/Loader";
import useAutoLogin from './hooks/useAutoLogin';

function App() {
  const isAuth = useSelector((state) => state.user.auth);
 // useSelector is a hook provided by React-Redux to allow components to access data from the Redux store.
 // It subscribes the component to the Redux store, meaning that whenever the relevant part of the state changes, the component will automatically re-render with the updated state.
    // (state) => state.user.auth:
 // This is a selector function that tells useSelector which piece of the Redux state to subscribe to.
// In this case, it's accessing the auth property inside the user slice of the state.
const loading = useAutoLogin();

return loading ? (
  <Loader text="..." />
) : (
    <div className={styles.container}>
      <BrowserRouter>  
      {/* When the browser’s URL changes (either through user interaction or programmatically), <BrowserRouter> updates the app to display the correct components. */}
        <div className={styles.layout}>
          <Navbar />
          <Routes>

            <Route
              path='/'
              exact
              element={<div className={styles.main}><Home /></div>}
            />

            <Route
              path='/crypto'
              exact
              element={<div className={styles.main}><Crypto /></div>}
            />


            <Route
              path='/blogs'
              exact
              element={
              <Protected isAuth={isAuth}>
              <div className={styles.main}><Blog /></div>  
              {/*  everything inside Protected is a children of protected, here div is children of protected and react will automatically pass it as a parameter. */}
              </Protected>
              }
              
            />
            
            <Route
              path='/blog/:id'
              exact
              element={
              <Protected isAuth={isAuth}>
              <div className={styles.main}><BlogDetails /></div>  
              {/*  everything inside Protected is a children of protected, here div is children of protected and react will automatically pass it as a parameter. */}
              </Protected>
              }
              
            />

<Route
              path='/blog-update/:id'
              exact
              element={
              <Protected isAuth={isAuth}>
              <div className={styles.main}><UpdateBlog /></div>  
              {/*  everything inside Protected is a children of protected, here div is children of protected and react will automatically pass it as a parameter. */}
              </Protected>
              }
              
            />

            <Route
              path='/submit'
              exact
              element={
                <Protected isAuth={isAuth}>
              <div className={styles.main}>< SubmitBlog /></div>
              </Protected>
              }
            />

            <Route
              path='/signup'
              exact
              element={<div className={styles.main}><Signup /></div>}
            />

            <Route
              path='/login'
              exact
              element={<div className={styles.main}><Login /></div>}
            />

            <Route
              path='/crypto'
              exact
              element={<div className={styles.main}>crypto page</div>}
            />
            
<Route
              path="*"                        // for any wrong path entered
              element={
                <div className={styles.main}>
                  <Error />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
