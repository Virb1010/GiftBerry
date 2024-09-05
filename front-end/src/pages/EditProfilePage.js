import React, { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ListGroup, Card, Form, Button } from 'react-bootstrap';

function EditProfilePage() {
    let Navigate = useNavigate();
    const { AuthState } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [interest, setInterest] = useState("");
    const [interestList, setInterestList] = useState([]);
    const [user, setUserProfile] = useState({});
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem("accessToken")) {
                Navigate("/welcome");
                return;
            }

            const response = await axios.get(`http://localhost:3001/users/byUsername/${username}`);
            const userData = response.data;
            setUserProfile(userData);
            setStartDate(new Date(userData.birthday)); 
            setInterestList(userData.interests || []);
            setName(userData.name);
        };

        fetchData();
    }, [AuthState])

    const assignNameValue = (event) => {
        setName(event.target.value);
    };

    const assignInterestValue = (event) => {
        setInterest(event.target.value);
    };

    const appendInterest = () => {
        if (interest.trim()) {
            setInterestList([...interestList, interest]);
            setInterest("");
        }
    };

    const removeInterest = (index) => {
        setInterestList(prevList => prevList.filter((_, i) => i !== index));
    };

    const submitForm = async (event) => {
        event.preventDefault();

        const profileInfo = {
            name: user.name,
            birthday: startDate,
            interests: interestList,
        };

        if (name.trim() !== "") {
            profileInfo.name = name;
        }

        await axios.patch(`http://localhost:3001/users/${username}`, profileInfo);
        Navigate(`/`);
    };

    return (
        <div className="editProfilePage">
            <Card className="editProfileContainer" style={{ width: '36rem' }} bg="danger" text="light">
                <Card.Title style={{ marginTop: '20px' }}><h3>Profile Information:</h3></Card.Title>
                <Form style={{ marginTop: '20px' }} onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Card.Body className="userInfoRow">
                            <Form.Label style={{ marginRight: '10px' }}> Name: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user.name || ""}
                                autoComplete="off"
                                value={name}
                                onChange={assignNameValue}
                            />
                        </Card.Body>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Card.Body className="userInfoRow">
                            <Form.Label style={{ marginRight: '10px' }}> Birthday: </Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </Card.Body>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicInterests">
                        <Card.Body className="userInfoRow">
                            <Form.Label style={{ marginRight: '10px' }}> Interests: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Jewelry, Basketball, Technology"
                                autoComplete="off"
                                value={interest}
                                onChange={assignInterestValue}
                            />
                            <Button onClick={appendInterest} variant="primary">Add</Button>
                        </Card.Body>
                    </Form.Group>
                    <ListGroup className="list-group-flush">
                        {interestList.map((value, key) => (
                            <ListGroup.Item>
                            <div className="interestList">
                                {value}
                                <button 
                                type="button"
                                class="btn-close"
                                onClick={() => removeInterest(key)}
                                aria-label="Close">
                                </button>
                            </div>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Card.Body className="text-center">
                        <Button variant="danger" type="submit" style={{ width: '12rem' }}>Submit</Button>
                    </Card.Body>
                </Form>
            </Card>
        </div>
    );
}

export default EditProfilePage;
