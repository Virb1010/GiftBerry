import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePostPage from "./pages/CreatePostPage"
import PostViewPage from "./pages/PostViewPage"
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import EditProfilePage from './pages/EditProfilePage';
import { AuthContext } from "./helpers/AuthContext"
import { useState, useEffect } from "react";
import ViewProfilePage from './pages/ViewProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { CustomNavbar } from './components/Navbar'

function App() {

    const [AuthState, setAuthState] = useState({});


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setAuthState(true)
        }
    }, [AuthState])


  return <div className="App">
  <AuthContext.Provider value={{AuthState, setAuthState}}>
  {localStorage.getItem("accessToken") ? (<CustomNavbar />) : (<></>)}
    <Router>
            <Routes>
                <Route path = "/" element = {<HomePage/>} />
                <Route path = "/createPost" element = {<CreatePostPage/>} />
                <Route path = "/post/:id" element = {<PostViewPage/>} />
                <Route path = "/login" element = {<LoginPage/>} />
                <Route path = "/signup" element = {<SignUpPage/>} />
                <Route path = "/welcome" element = {<WelcomePage/>} />
                <Route path= "/editProfile" element =  {<EditProfilePage/>} />
                <Route path= "/:username" element =  {<ViewProfilePage/>} />
            </Routes>
        </Router>
  </AuthContext.Provider>
  </div>
}

export default App;
