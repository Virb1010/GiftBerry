import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function PostViewPage() {
    
    let Navigate = useNavigate();
    const { AuthState } = useContext(AuthContext);

    let { id } = useParams();
    const [post, createPostObject] = useState({});
    const [commentList, createCommentList] = useState([]);


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            Navigate("/welcome");
        } else {
        axios.get(`http://localhost:3001/posts/byID/${id}`).then((response) => {
        createPostObject(response.data);
        })
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
        createCommentList(response.data);
        })}
    }, [AuthState])

    const initialValues = {
        comment: "",
    }

    const validationSchema = Yup.object().shape({
        comment: Yup.string().max(250).required(),
    })

    const onSubmit = (data) => {
        const commentObject = {
            comment: data.comment,
            username: localStorage.getItem("username"),
            postId: id
        }
        console.log(commentObject)

        axios.post("http://localhost:3001/comments", commentObject).then((response) => {
            console.log("comment posted")
            Navigate(`/`)
        })
    }

    return (
        <div className="postViewPage">
          <div className="leftSide">
            <div className="post" id="individual">
              <div className="title"> {post.title} </div>
              <div className="body">{post.caption}</div>
              <div className="footer">{post.username}</div>
            </div>
          </div>
          <div className="rightSide">
          <div className="createCommentObject">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
                <Form className="formContainer">
                    <label>Comment</label>
                    <ErrorMessage name="comment" component="span" />
                    <Field 
                        id="createCommentInput" 
                        name="comment" 
                    />
                    <button type="submit"> Post </button>
                </Form>
            </Formik>
        </div>
            <div className="commentList">
            {commentList.map((value, key) => {
                return (
                <div key="key" className = "comment">
                    <p>{value.comment} </p>
                    <p>{value.username}</p>
                </div>
                )
            })}
            </div> 
         </div>
        </div>
      );
             
}

export default PostViewPage;