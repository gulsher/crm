import React from 'react'
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import {
  Routes,
  Route,
  Link,
  useRoutes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
export default function View(props) {

  const {first_name ,last_name, contact , email, status , comments} = props.data
  const history = useNavigate();

  const [is_disabled,setEdit] = useState(true)
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";
  let baseURL = "http://localhost:4000/";
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
    } else if (value.length > 10) {
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

  const handleEdit = e =>{
    setEdit(false)
  }
  const refresh = e => {
    history(0);
  }

  return (
    <div>
      <div className='row mt-5'>
        <div className='col-12'>
          <button className='btn btn-danger btn-sm' onClick={handleEdit} >Edit</button>
          <button className='ms-3 btn btn-warning btn-sm' onClick={refresh} >Go Back</button>
        </div>
      </div>
      <Formik
      initialValues={{
        fname: first_name,
        lname: last_name,
        mobile: contact,
        email: email,
        stats: status,
        comments: comments,
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
          

          <div className="row">
            
            <div className="col-10">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <span className="anchor" id="formUserEdit"></span>

                  <div className="card card-outline-secondary mt-5">
                    <div className="card-header">
                      <h3 className="mb-0">View/Modify Form</h3>
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
                              disabled={is_disabled}
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
                              disabled={is_disabled}
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
                              disabled={is_disabled}
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
                              disabled={is_disabled}
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
                              disabled={is_disabled}
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
                              disabled={is_disabled}
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
                              disabled={is_disabled}
                            />
                            <button
                              className="btn btn-primary ms-2"
                              type="submit"
                              disabled={is_disabled} 
                            >
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
    </div>
  )
}
