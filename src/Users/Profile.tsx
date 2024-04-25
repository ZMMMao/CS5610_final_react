import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();
    const aId = account._id;
    const user = await client.findUserById(aId);
    console.log(user);
    setProfile(user);
  };

  const save = async () => {
    await client.updateUser(profile);
    await fetchProfile();
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <Link
        to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning mb-1 w-50"
      >
        Users
      </Link>
      {profile && (
        <div>
          <input
            className="form-control mb-1"
            style={{ width: "50%" }}
            placeholder="Username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            className="form-control mb-1"
            style={{ width: "50%" }}
            placeholder="Password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            className="form-control mb-1"
            style={{ width: "50%" }}
            placeholder="First Name"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            className="form-control mb-1"
            style={{ width: "50%" }}
            placeholder="Last Name"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            className="form-control mb-1"
            style={{ width: "50%" }}
            value={profile.dob}
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            className="form-control mb-1"
            style={{ width: "50%" }}
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control mb-1"
            style={{ width: "50%" }}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button className="btn btn-primary me-1" onClick={save}>
            Save
          </button>
          <button className="btn btn-danger" onClick={signout}>
            Signout
          </button>
        </div>
      )}
    </div>
  );
}