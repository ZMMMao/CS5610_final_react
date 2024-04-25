import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };

  const signup = () => {
    navigate("/Kanbas/Account/Signup");
  };

  return (
    <div>
      <h1>Signin</h1>
      <button className="btn btn-warning mb-3" onClick={signup}>
        New User: Please Click Here to Sign Up
      </button>
      <input
        className="form-control mb-1"
        style={{ width: "50%" }}
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        className="form-control mb-1"
        style={{ width: "50%" }}
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="btn btn-primary" onClick={signin}>
        Sign in
      </button>
    </div>
  );
}
