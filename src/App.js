import "./App.css";
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

function App() {
  const [isAdminState, setIsAdmin] = useState(false);
  const [isSignedInState, setIsSignedIn] = useState(false);
  //const history = useHistory();
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

  //useEffect
  return (
    <div className="bg-slate-500">
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
          <Route path="/signup" exact element={<SignUp onSignIn={signIn} />} />

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
      </BrowserRouter >
    </div>
  );

  function nav() {
    return (
      <>
        <nav className="shadow-black shadow-l flex flex-row bg-white border-b-2 border-solid border-blue-200   animate-fade-left ">
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
              <p>ورود | ثبت نام</p>
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
              <p>خروج از حساب کاربری</p>
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
            اخبار
          </NavLink>
        </nav>
      </>
    );
  }
}

export default App;
