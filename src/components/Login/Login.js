import React, { useContext, useState } from "react";
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
  });

  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  let isFormFieldValid = true;
  let validPassword = false;
  let passwordValue = "";
  const handleChange = (e) => {
    console.log();
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    if (name === "email") {
      isFormFieldValid = /\S+@\S+\.\S+/.test(value);
      console.log(name);
    }

    if (name === "password") {
      isFormFieldValid= false;
      const passwordMinimumLength = value.length > 7;
      const passwordHasNumberAndSpChr = /\d{1}/.test(value);

      //   if (user.password) {
      //     const confirmPassword = user.password === value;
      //     isFormFieldValid =
      //       confirmPassword && passwordHasNumberAndSpChr && passwordMinimumLength;
      //   }
      validPassword = passwordMinimumLength && passwordHasNumberAndSpChr;
      passwordValue = value;
      console.log(name);
    }
    if(name === "confirmPassword"){
      if(validPassword){

        isFormFieldValid = passwordValue === value;
      }
  }

    if (isFormFieldValid) {
      const newUser = { ...user };
      newUser[name] = value;
      setUser(newUser);
    }
  };

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

  const handleSignInWithEmail = (e) => {
    const { email, password, name } = user;
    if (!newUser && email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          // Signed in

          console.log(user);
          const newUser = { ...user };
          newUser.name = result.user.displayName;
          setUser(newUser);

          setLoggedInUser(newUser);
          history.replace(from);
          console.log(result);

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
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
          console.log(errorMessage);
          // ..
        });
    }
    e.preventDefault();
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
  return (
    <div>
      <form onSubmit={handleSignInWithEmail}>
        {newUser && (
          <input
            onBlur={handleChange}
            name="name"
            type="text"
            placeholder="Your name"
          />
        )}

        <input
          onBlur={handleChange}
          name="email"
          type="email"
          id=""
          placeholder="Your email"
          required
        />
        <input
          onBlur={handleChange}
          name="password"
          type="password"
          id="password"
          placeholder="password"
          required
        />
        {newUser && (
          <input
            onBlur={handleChange}
            name="confirmPassword"
            type="password"
            id=""
            placeholder="confirm password"
            required
          />
        )}
        <input type="submit" value="submit" />
      </form>
      {newUser && (
        <p>
          Already have an account? <span style={{ color: "red" }}>Login</span>
        </p>
      )}
      {!newUser && (
        <p>
          Don't have an account?{" "}
          <span style={{ color: "red" }} onClick={() => setNewUser(true)}>
            create a new account
          </span>{" "}
        </p>
      )}

      <h4>OR</h4>
      <button onClick={handleSignInWithGoogle}>continue with Google</button>
    </div>
  );
};

export default Login;
