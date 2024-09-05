import React, { useState, useContext } from "react"
import axios from "axios";
import {useNavigate } from "react-router-dom"
import {AuthContext} from "../helpers/AuthContext"
import {Tab, Tabs, Card, Form, Button} from 'react-bootstrap';

function WelcomePage() {
    let Navigate = useNavigate();
    const {setAuthState} = useContext(AuthContext)
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const logIn = (event) => {
        event.preventDefault()

        const data = {
            username: username,
            password: password
        }

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

    const signUp = (event) => {
        event.preventDefault()

        const data = {
            username: username,
            password: password
        }

        axios.post("http://localhost:3001/users", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data.token)
                localStorage.setItem("username", response.data.username)
                setAuthState(true)
                Navigate(`/editProfile`)
            }
        })
    }

    return (
        <div className="welcomePage">
            <div className="welcomePageFrame">
                <Card className="userDetailsContainer" style={{ width: '24rem'}}>
                    <Card.Title style={{ color: '#d9534f', marginTop: '20px' }}><h2>Welcome to GiftBerry!</h2></Card.Title>
                    <Tabs
                    defaultActiveKey="Log In"
                    id="justify-tab-example"
                    className="mb-3"
                    style={{ width: '18rem', marginTop: '20px', backgroundColor: 'white'}}
                    justify
                    >
                        <Tab eventKey="Log In" title="Log In">
                            <Card.Body className="text-center">
                                <Card.Title style={{ color: '#d9534f' }}><h4>Log In</h4></Card.Title>
                            </Card.Body>
                            <Form style={{ marginTop: '20px'}} onSubmit={logIn}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    className="customBorder"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    className="customBorder"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Card.Body className="text-center">
                                    <Button variant="danger" type="submit" style={{ width: '12rem' }}>
                                        Submit
                                    </Button>
                                </Card.Body>
                            </Form>
                        </Tab>
                        <Tab eventKey="Sign Up" title="Sign Up">
                            <Card.Body className="text-center">
                                <Card.Title style={{ color: '#d9534f' }}><h4>Sign Up</h4></Card.Title>
                            </Card.Body>
                            <Form style={{ marginTop: '20px'}} onSubmit={signUp}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    className="customBorder"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    className="customBorder"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Card.Body className="text-center">
                                    <Button variant="danger" type="submit" style={{ width: '12rem' }}>
                                        Submit
                                    </Button>
                                </Card.Body>
                            </Form>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        </div>
    )
}


export default WelcomePage;


