import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const handleRegisterWithEmail = () => {};
  return (
    <div>
      <h4>name{user.password}</h4>
      <form onSubmit={handleRegisterWithEmail}>
        <input name="name" type="text" />
        <input type="email" name="email" id="" />
        <input type="password" name="password" id="" />
        <input type="password" name="password" id="" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Register;
