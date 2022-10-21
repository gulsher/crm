import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useRoutes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SideMenu from "./Common/SideMenu";
import Header from "./Common/Header";
import axios from "axios";
import View from "./View";

export default function Welcome() {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState({})
  const [is_singleView, setSingleView] = useState(false);
  let baseURL = "http://localhost:4000/";
  let url = `${baseURL}allCustomer/`;
  useEffect(() => {
    axios
      .get(url)
      .then((resp) => {
        console.log(resp);
        if (resp.data.result.length) {
          setData(resp.data.result);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const css = (stats) => {
    if (stats == "i") {
      return "btn-success";
    }
    if (stats == "p") {
      return "btn-warning";
    }
    if (stats == "n") {
      return "btn-danger";
    }
  };

  const handleView = (item) =>{
    setSingleView(true)
    setSingleData(item)
  }

  return (
    <>
      <div className="container-fluid">
        <Header />

        <div className="row">
          <div className="col-2 ">
            <SideMenu />
          </div>
          <div className="col-10">
            
           { !is_singleView ? <div
              className="row  mt-5"
              style={{ fontWeight: "600", color: "#252525" }}
            >
              {data.length ? (
                data.map((item, key) => {
                  return (
                    <div key={key} className="col-4 mt-3">
                      <div className="card shadow">
                        <div className="card-body">
                          <h5 className="card-title">
                            {item.first_name} {item.last_name}
                          </h5>
                          <p className="card-text">Email: {item.email}</p>
                          <p className="card-text">Contact: {item.contact}</p>
                          <button className={`btn ${css(item.status)} w-100`} onClick={() =>handleView(item)} >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p> No Data Available</p>
              )}
            </div> :<View  data={singleData}/> }
          </div>
        </div>
      </div>
    </>
  );
}
