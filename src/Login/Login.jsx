import React ,{useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../assets/9eac6f4eb377d901d3c63b945eab92d1.webp";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setAuth }) {
  let baseURL = "http://localhost:4000/";
  let token = localStorage.getItem("token");
  const [userID, setUserID] = useState(undefined);
  const [userPass, setUserPass] = useState(undefined);
  const [error, setError] = useState("");
  const history = useNavigate();
  function setUser(e) {
    setUserID(e.target.value);
  }
  function setPass(e) {
    setUserPass(e.target.value);
  }

  useEffect(()=>{
    
    if(token && token.length){
      history('/home')
      setAuth(true)
    }else{
      history('/')
      setAuth(false)
    }
  },[])

  const handleSubmit = () => {
    let payload = {
      userID,
      userPass,
    };

    console.log(payload);
    let url = `${baseURL}login/`;
    axios
      .post(url, payload)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
        history("/home/");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status == 400) {
          setError(e.response.data.status);
        }
      });
  };

  return (
    <div className="login-page container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <div className="login-box">
            <img src={logo} width="200px" className="rounded mx-auto d-block" />
           { error.length ? <div className="alert alert-danger" role="alert">
              {error}
            </div>:null }
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter userID"
                  onChange={setUser}
                  autoFocus
                />
                <Form.Text className="text-muted">
                  We'll never share your ID with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={setPass}
                />
              </Form.Group>

              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
