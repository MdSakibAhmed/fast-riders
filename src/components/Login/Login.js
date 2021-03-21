import React, { useContext, useEffect, useState } from "react";
import {useForm} from "react-hook-form"
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

    user
      .updateProfile({
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

  const handleConfirmPassword = () => {

  }
// let handleInputValue;
//   useEffect(()=> {
//       handleInputValue = (values)=> {
//     const newUser = {...user}
//     newUser.name= values.name;
//     newUser.email =  values.email;
//     setUser(newUser)
    

//   }

 // },[user])
 const handleChange = (e)=> {
   console.log(e.target.value);
   const newUser = {...user};
   newUser[e.target.name] = e.target.value;
   setUser(newUser)

 }
 

  const handleSignInWithEmail = (e) => {
    console.log(e);
    
    console.log(user);
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
          console.log(result);

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUser = { ...user };
          // newUser.success= false;
          // newUser.error= errorMessage;
          // setUser(newUser);

          console.log(errorMessage);
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
          // newUser.success= true;
          // newUser.error= ""
          setUser(newUser);
          updateUserName(newUser.name);
          setLoggedInUser(newUser);
          history.replace(from);

          console.log(result);

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
         
          newUser.success= false;
          newUser.error= errorMessage
          setUser(newUser);
          console.log(errorMessage);
          // ..
        });
    }
    //e.preventDefault();
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
        console.log(result);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
        console.log('The passwords dont match')
        setMatchPassword(false)
        return
      }else{
        console.log('Ok.')
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
<form onSubmit={handleSubmit(handleSignInWithEmail)}>

{newUser && <input name="name" onBlur={handleChange} placeholder="Your name" ref={register({ required: true })} /> }

      
      <input type="email" onBlur={handleChange} placeholder="Your email" name="email" ref={register({ pattern: /\S+@\S+\.\S+/,required:true })} />

      <input type="newpassword"
                  ref={register({ required: true })}

                  name="newpassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={onVerifyNewPassword}
                />

                {newUser &&  <input type="confirmpassword"
                  ref={register({ required: true })}
                  name="confirmpassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={onVerifyNewPassword}



               />}
               {!matchPassword && <p>password does not match</p> }
       
      <input type="submit" />
    </form>
   
      {newUser && (
        <p>
          Already have an account? <span onClick={() => setNewUser(false)} style={{ color: "red" }}>Login</span>
        </p>
      )}
      {!newUser && (
        <p className="mt-1">
          Don't have an account?{" "}
          <span style={{ color: "red" }} onClick={() => setNewUser(true)}>
            create a new account
          </span>{" "}
        </p>
      )}

      <h4 className="text-center">OR</h4>
      <button className="w-100 rounded p-2 size border-0 text-white bg-primary" onClick={handleSignInWithGoogle}>continue with Google</button>
{/*       
    </div>
    </div> */}
</>
  );
};

export default Login;
