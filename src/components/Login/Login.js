import React, { useContext, useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import "./Login.css"
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./Firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    success:"",
    error:""
  });

  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
        photoURL: "",
      })
      .then(() => {
        // Update successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

 const handleChange = (e)=> {
   console.log(e.target.value);
   const newUser = {...user};
   newUser[e.target.name] = e.target.value;
   setUser(newUser)
 }
 
  const handleSignInWithEmail = () => {
    const { email, password } = user;
    if (!newUser && email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then((result) => {
          // Signed in
          console.log(user);
          const newUser = { ...user };
          newUser.name = result.user.displayName;
          newUser.success= true;
          newUser.error= ""
          setUser(newUser);
          setLoggedInUser(newUser);
          history.replace(from);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const newUser = { ...user };
          newUser.success= false;
          newUser.error= errorMessage;
          setUser(newUser);
        });
    }

    if (newUser && email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          // Signed in
          const newUser = { ...user };
          newUser.email = email;
          newUser.password = password;
          newUser.success= true;
          newUser.error= ""
          setUser(newUser);
          updateUserName(newUser.name);
          setLoggedInUser(newUser);
          history.replace(from);

          console.log(result);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          newUser.success= false;
          newUser.error= errorMessage
          setUser(newUser);
        });
    }
  };

  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        const signInUser = {
          name: result.user.displayName,
          email: result.user.email,
        };
        // updateUserName(signInUser.name)
        console.log(signInUser.name);
        const newUser = { ...user };
        newUser.name = signInUser.name;
        newUser.email = signInUser.email;
        setUser(newUser);
        setLoggedInUser(newUser);
        history.replace(from);

      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const newUser = { ...user };
          newUser.success= false;
          newUser.error= errorMessage;
          setUser(newUser);
      });
  };

  const { register, errors, handleSubmit, formState } = useForm({
    mode: "onChange"
  })

  const [newpassword, setNewPassword] = useState('')

  const [confirmpassword, setConfirmPassword] = useState('');
  const [matchPassword, setMatchPassword]= useState(true)

  const  { touched  } = formState;

  const onVerifyNewPassword = () => {

    if(touched.newpassword === true && touched.confirmpassword === true){
      if(newpassword !== confirmpassword){
        setMatchPassword(false)
        return
      }else{
        const newUser = { ...user };
        newUser.password = confirmpassword;
        setUser(newUser)
      }
   }
   else if(touched.newpassword === true){
    const newUser = { ...user };
    newUser.password = newpassword;
    setUser(newUser)
   }
  }
  return (
<>
<div className="container mt-5">
{ !user.success && <h4 className="text-danger text-center "> {user.error} </h4> }
<div className="w-50 mr-auto ml-auto border p-4 rounded">

{newUser?<h2 className="mb-4">Create new account</h2>: <h2 className="mb-4">Log in</h2>}
<form onSubmit={handleSubmit(handleSignInWithEmail)}>

{newUser && <input className="  d-block w-100 border-top-0 border-left-0 border-right-0 mb-3 ps-1" name="name" onBlur={handleChange} placeholder="Your name" ref={register({ required: true })} /> }
{errors.name && <p className="text-danger">! This is required field</p> }

      
      <input type="email" className="d-block w-100 border-top-0 border-left-0 border-right-0 mb-3" onBlur={handleChange} placeholder="Your email" name="email" ref={register({ pattern: /\S+@\S+\.\S+/,required:true })} />
      {errors.email && <p className="text-danger"> ! invalid email</p> }

      <input className="d-block w-100 border-top-0 border-left-0 border-right-0 mb-3" type="password" placeholder="password"
                  ref={register({ required: true,pattern:/\d{2}/ })}

                  name="newpassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={onVerifyNewPassword}
                />
                {errors.newpassword && <p className="text-danger">! password must contain minimum two numbers</p> }

                {newUser &&  <input className="d-block w-100 border-top-0 border-left-0 border-right-0 mb-3" type="password"
                  ref={register({ required: true })}
                  name="confirmpassword" placeholder="confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={onVerifyNewPassword}



               />}
               {!matchPassword && <p className="text-danger">password does not match</p> }
       
      <input className="bg-primary text-white border-0 w-100 rounded p-2" type="submit" value={newUser ? "Create an account":"Login"} />
    </form>
   

      {newUser? (
        <p className="text-center mt-1">
          Already have an account? <span onClick={() => setNewUser(false)} style={{ color: "red",cursor:"pointer" }}>Login</span>
        </p>
      ):(
        <p className="mt-1 text-center">
          Don't have an account?{" "}
          <span style={{ color: "red",cursor:"pointer" }} onClick={() => setNewUser(true)}>
            create a new account
          </span>{" "}
        </p>
      )}

      <h4 className="text-center">OR</h4>
      <button className="w-100 rounded-pill p-2  btn-outline-primary bold border-0  " onClick={handleSignInWithGoogle}>continue with Google</button>
      </div>
</div>
</>
  );
};

export default Login;
