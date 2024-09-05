import React, { useContext } from "react"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext"

function SignUpPage() {
    let Navigate = useNavigate();
    const {setAuthState} = useContext(AuthContext)

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                console.log("accessToken", response.data.token)
                console.log("username", response.data.username)
                localStorage.setItem("accessToken", response.data.token)
                localStorage.setItem("username", response.data.username)
                setAuthState(true)
                Navigate(`/editProfile`)
            }
        })
    }

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
                <Form className="formContainer">
                    <label>Username</label>
                    <ErrorMessage name="username" component="span" />
                    <Field 
                        id="createPostInput" 
                        name="username" 
                    />
                    <label>Password</label>
                    <ErrorMessage name="password" component="span" />
                    <Field 
                        id="createPostInput" 
                        type="password"
                        name="password" 
                    />
                    <button type="submit"> Post </button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpPage;