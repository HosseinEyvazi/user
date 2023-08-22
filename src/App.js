import "./App.css";
import themeContext from "./themeContext/themeContext";
import DigitalCoin from "./Components/DigitalCoin";
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import News from "./Components/News";
import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Link,
  NavLink,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Outh from "./Components/Outh";
import NotFound from "./Components/NotFound";
import SignUp from "./Components/signUp";
import Login from "./Components/login";
import ProtectedHome from "./Components/AdminProtected";
import AdminHome from "./Components/adminHome";
import SignedInProtected from "./Components/protectedSignIn";
import ReactSwitch from "react";
import { bg } from "date-fns/locale";

function App() {
  const [isAdminState, setIsAdmin] = useState(false);
  const [isSignedInState, setIsSignedIn] = useState(false);

  function signInAdmin() {
    setIsAdmin(true);
  }
  function signOutAdmin() {
    setIsAdmin(false);
  }
  function signIn() {
    setIsSignedIn(true);
  }
  function signOut() {
    setIsSignedIn(false);
  }
  function handleToggle(){
    setCurrentTheme(currentThemeState==="light" ? "dark" : "light")
  }

  const [currentThemeState , setCurrentTheme] = useState("light");

  return (
    <themeContext.Provider value={{currentThemeState , setCurrentTheme}}>
      <div className="bg-gray-50" id={currentThemeState} >
        <BrowserRouter>
          {nav()}
          <Outlet />
          <Routes>
            <Route
              path="/home"
              exact
              element={
                <ProtectedHome isAdmin={isAdminState}>
                  <AdminHome />
                </ProtectedHome>
              }
            />

            <Route path="/outh" exact element={<Outh />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route
              path="/signup"
              exact
              element={<SignUp onSignIn={signIn} />}
            />

            <Route
              path="/digital"
              exact
              element={
                <SignedInProtected
                  isSignedIn={isSignedInState}
                  isAdmin={isAdminState}
                >
                  <DigitalCoin />
                </SignedInProtected>
              }
            />
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              exact
              element={
                <Login
                  onSignInAdmin={signInAdmin}
                  onSignIn={signIn}
                  isSignedIn={isSignedInState}
                  isAdmin={isAdminState}
                />
              }
            />
            <Route path="/news" exact element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    //</themeContext.Provider>
  );

  function nav() {
    return (
      <div >
        <nav className=" flex flex-row  border-b-2 border-solid    animate-fade-left " >
          {/* //handle logout , login btn in nav */}
          {!isSignedInState && !isAdminState ? (
            <NavLink
              //  className=""
              className={
                " flex flex-row p-3 m-2 stroke-slate-800  hover:scale-105 "
              }
              to="/signup"
            >
              <img src="/icons/user.png" alt="x" className="w-5 h-5 ml-2 " />
              <p >ورود | ثبت نام</p>
            </NavLink>
          ) : (
            <NavLink
              className={
                " flex flex-row p-3 m-2 stroke-slate-800  hover:scale-105 "
              }
              to="/home"
              onClick={() => {
                signOut();
                signOutAdmin();
              }}
            >
              <img src="/icons/user.png" alt="x" className="w-5 h-5 ml-2 " />
              <div className="flex flex-col">
                <p>خروج از حساب کاربری</p>
              </div>
            </NavLink>
          )}
          <NavLink
            className={
              " flex flex-row p-3 m-2 stroke-slate-800  hover:scale-105 "
            }
            to="/home"
          >
            <img src="/icons/home.png" alt="x" className="w-5 h-5 ml-2" />
            <p>خانه</p>
          </NavLink>
          <NavLink
            className={
              " flex flex-row p-3 m-2 stroke-slate-800  hover:scale-105 "
            }
            to="digital"
          >
            <img src="/icons/bitcoin.png" alt="x" className="w-5 h-5 ml-2" />
            <p>اخبار ارز دیجیتال</p>
          </NavLink>
          <NavLink
            exact
            className={
              " flex flex-row p-3 m-2 stroke-slate-800  hover:scale-105 "
            }
            to="/news"
          >
            <img src="/icons/news.png" alt="x" className="w-5 h-5 ml-2" />
            <p>اخبار </p>
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default App;
