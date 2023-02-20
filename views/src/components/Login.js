import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const parsRes = await response.json(); //We get the object containing jwToken here
        localStorage.setItem("token", parsRes.token); //We store the token in localStorage
        setAuth(true); //We change auth state to true
        toast.success("Login successfully"); //use toast for notif
      } else {
        setAuth(false); //We change auth state to false
        toast.error(await response.json()); //use toast to send custom err message defined in server side
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">No account? Register here</Link>
    </>
  );
}