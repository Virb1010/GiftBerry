import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"
import { birthdayFormatter } from "../helpers/UserDataFormatters"
import { DateSortHelper } from "../helpers/UserDataFormatters"
import { Card, ListGroup } from 'react-bootstrap';


function HomePage() {
    const Navigate = useNavigate();
    const { AuthState } = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            Navigate("/welcome");
        } else {
            axios.get("http://localhost:3001/users").then((response) => {
            editUserList(response.data)
        })
        }
    }, [AuthState]);
    
    const [userList, editUserList] = useState([]);
    
    userList.sort((a, b) => {
        const currDate = new Date();
        const aDate = new Date(a.birthday)
        const bDate = new Date(b.birthday)
        
        const aMonthDiff = DateSortHelper(aDate, currDate);
        const bMonthDiff = DateSortHelper(bDate, currDate);

        console.log("Date 1: ", aDate.getMonth(), aDate.getDate(), aMonthDiff)
        console.log("Date 2: ", bDate.getMonth(), bDate.getDate(), bMonthDiff)

        if (aMonthDiff === bMonthDiff) {
            return aDate.getDate() - bDate.getDate();
        } else {
            return aMonthDiff-bMonthDiff;
        }
    });

    console.log("userlist", userList)

    return(
        <div className="HomePage">
            {userList.map((value, key) => {
                return (
                <Card
                className="post"
                style={{ width: '36rem' }}
                bg="danger"
                text="light"
                onClick={() => {Navigate(`/${value.username}`)}}>
                <Card.Body>
                    <Card.Title>{value.name}</Card.Title>
                    <Card.Subtitle>{birthdayFormatter(value.birthday)}</Card.Subtitle>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {value.interests && value.interests.map((value, key) => (
                        <ListGroup.Item>{value}</ListGroup.Item>
                    ))}
                </ListGroup>
                </Card>
                )
            })} 
        </div>
    )
}

export default HomePage;