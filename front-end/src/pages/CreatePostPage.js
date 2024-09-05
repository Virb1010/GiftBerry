import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"

function CreatePostPage() {
    let Navigate = useNavigate();
    const { AuthState } = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            Navigate("/welcome");
        }
    }, [AuthState]);

    const initialValues = {
        title: "",
        caption: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        caption: Yup.string().max(250).required(),
    })

    const onSubmit = (data) => {
        data.username = localStorage.getItem("username")
        axios.post("http://localhost:3001/posts", data).then((response) => {
            console.log("post made")
            Navigate(`/`)
        })
    }

    return (
        <div className="createPostPage">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
                <Form className="formContainer">
                    <label>Title</label>
                    <ErrorMessage name="title" component="span" />
                    <Field 
                        id="createPostInput" 
                        name="title" 
                        placeholder="Ex: My trip to Dehradun!"
                    />
                    <label>Caption</label>
                    <ErrorMessage name="caption" component="span" />
                    <Field 
                        id="createPostInput" 
                        name="caption" 
                        placeholder="Ex: Just saw the Clock Tower and Astley Hall!"
                    />
                    <button type="submit"> Post </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePostPage;