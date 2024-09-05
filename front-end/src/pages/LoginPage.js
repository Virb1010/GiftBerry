import React, { useContext } from "react"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext"

function LoginPage() {
    const {setAuthState} = useContext(AuthContext)

    let Navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users/login", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data.token)
                localStorage.setItem("username", response.data.username)
                setAuthState(true)
                Navigate(`/`)
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

export default LoginPage;