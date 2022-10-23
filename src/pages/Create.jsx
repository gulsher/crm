import React, { useState } from "react";
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
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
let baseURL = "http://localhost:4000/";

export default function Create() {
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";
  
  // Error Component
  const errorMessage = (error) => {
    return <div className="invalid-feedback">{error}</div>;
  };

  const validateFirstName = (value) => {
    let error;
    if (!value) {
      error = required;
    } else if (value.length > 12) {
      error = maxLength;
    }
    return error;
  };

  const validateLastName = (value) => {
    let error;
    if (!value) {
      error = required;
    } else if (value.length > 12) {
      error = maxLength;
    }
    return error;
  };

  const validateMobileNumber = (value) => {
    let error;
    if (!value) {
      error = required;
    } else if (value.toString().length > 10) {
      error = maxLength;
    }
    return error;
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        stats: "i",
        comments: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        let payload = values;
        let url = `${baseURL}create/`;
        axios
          .post(url, payload)
          .then((res) => {
            console.log(res);
            resetForm();
            toast.success("Request Added Successfully")
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      {({ errors, touched, isValidating }) => (
        <div className="container-fluid">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Header />

          <div className="row">
            <div className="col-2 ">
              <SideMenu />
            </div>
            <div className="col-10">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <span className="anchor" id="formUserEdit"></span>

                  <div className="card card-outline-secondary mt-5">
                    <div className="card-header">
                      <h3 className="mb-0">Create Form</h3>
                    </div>
                    <div className="card-body">
                      <Form>
                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label">
                            First name
                          </label>
                          <div className="col-lg-9">
                            <Field
                              className={
                                "form-control" +
                                (errors.fname && touched.fname
                                  ? " is-invalid"
                                  : "")
                              }
                              type="text"
                              name="fname"
                              validate={validateFirstName}
                            />
                            {errors.fname &&
                              touched.fname &&
                              errorMessage(errors.fname)}
                          </div>
                        </div>
                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Last name
                          </label>
                          <div className="col-lg-9">
                            <Field
                              className={
                                "form-control" +
                                (errors.lname && touched.lname
                                  ? " is-invalid"
                                  : "")
                              }
                              type="text"
                              name="lname"
                              validate={validateLastName}
                            />
                            {errors.lname &&
                              touched.lname &&
                              errorMessage(errors.lname)}
                          </div>
                        </div>
                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Email
                          </label>
                          <div className="col-lg-9">
                            <Field
                              className={
                                "form-control" +
                                (errors.email && touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                              type="email"
                              name="email"
                              validate={validateEmail}
                            />
                            {errors.email &&
                              touched.email &&
                              errorMessage(errors.email)}
                          </div>
                        </div>
                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Contact
                          </label>
                          <div className="col-lg-9">
                            <Field
                              className={
                                "form-control" +
                                (errors.mobile && touched.mobile
                                  ? " is-invalid"
                                  : "")
                              }
                              type="number"
                              name="mobile"
                              validate={validateMobileNumber}
                            />
                            {errors.mobile &&
                              touched.mobile &&
                              errorMessage(errors.mobile)}
                          </div>
                        </div>

                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Status
                          </label>
                          <div className="col-lg-9">
                            <Field
                              as="select"
                              name="stats"
                              className="form-select"
                            >
                              <option value="i">Interested</option>
                              <option value="n">Not Interested</option>
                              <option value="p">Pending</option>
                            </Field>
                          </div>
                        </div>

                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Comments
                          </label>
                          <div className="col-lg-9">
                            <Field
                              component="textarea"
                              rows="4"
                              className="form-control"
                              placeholder="Leave a comment here"
                              name="comments"
                            ></Field>
                          </div>
                        </div>
                        <div className="form-group row mb-2">
                          <label className="col-lg-3 col-form-label form-control-label"></label>
                          <div className="col-lg-9">
                            <input
                              className="btn btn-secondary"
                              type="reset"
                              value="Cancel"
                            />
                            <button
                              className="btn btn-primary ms-2"
                              type="submit"
                            >
                              <i className="fa-regular fa-circle-check me-2"></i> 
                               Save
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
