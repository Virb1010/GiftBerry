import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { birthdayFormatter } from "../helpers/UserDataFormatters";
import { Card, ListGroup, Button } from 'react-bootstrap';

function ViewProfilePage() {
    let Navigate = useNavigate();
    const { AuthState } = useContext(AuthContext);
    let { username } = useParams();
    const [user, createUserProfile] = useState({});
    let [sliderValue, setSliderValue] = useState(500);
    const [checkedInterests, setCheckedInterests] = useState({});
    const [amazonResults, setAmazonResults] = useState([]);
    let [displayRefreshButton, setDisplayRefreshButton] = useState(false);
    let [resultIndex, setResultIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem("accessToken")) {
                Navigate("/welcome");
            } else {
                await axios.get(`http://localhost:3001/users/byUsername/${username}`).then((response) => {
                    createUserProfile(response.data);
                    const interestsCheckedState = response.data.interests.reduce((acc, interest) => {
                        acc[interest] = false;
                        return acc;
                    }, {});
                    setCheckedInterests(interestsCheckedState);
                });
            }
        }
        fetchData();
    }, [AuthState, username, Navigate]);

    useEffect(() => {
        console.log('Amazon Results Updated:', amazonResults);
    }, [amazonResults]);


    const fetchAmazonData = async (inputQuery, inputPrice) => {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/search',
            params: {
                query: inputQuery,
                page: '1',
                country: 'US',
                sort_by: 'RELEVANCE',
                product_condition: 'ALL',
                is_prime: 'false',
                max_price: inputPrice
            },
            headers: {
                'x-rapidapi-key': 'b8f3808cdcmsh9cf5f4c09f0118ep17b695jsn7814352bb2a0',
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const amazonData = response.data;

            const amazonResult = {
                productName: amazonData.data.products[resultIndex].product_title,
                productPrice: amazonData.data.products[resultIndex].product_price,
                productRating: amazonData.data.products[resultIndex].product_star_rating,
                productURL: amazonData.data.products[resultIndex].product_url,
                productPhoto: amazonData.data.products[resultIndex].product_photo
            }
            
            setAmazonResults(prevResults => [...prevResults, amazonResult]);
            
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = (interest) => {
        setCheckedInterests(prevState => ({
            ...prevState,
            [interest]: !prevState[interest]
        }));
    };

    const handleReset = () => {
        const resetCheckedState = Object.keys(checkedInterests).reduce((acc, interest) => {
            acc[interest] = false;
            return acc;
        }, {});
        setCheckedInterests(resetCheckedState);
    };

    const handleApply = () => {
        console.log("result index: ", resultIndex)
        const selectedInterests = Object.keys(checkedInterests).filter(interest => checkedInterests[interest]);
        setAmazonResults([])
        setDisplayRefreshButton(true);
        selectedInterests.map((value) => {
            fetchAmazonData(value, sliderValue, resultIndex);
        })
    };

    const handleRefresh = () => {
        setResultIndex(prevIndex => prevIndex + 1);
        // handleApply();
    };

    useEffect(() => {
        handleApply();
    }, [resultIndex]);

    return (
        <div className="ViewProfilePage">
            <div className="ViewProfilePageFrame">
                <Card style={{ width: '36rem', marginTop: '30px' }} bg="danger" text="light">
                    <Card.Body className="mx-auto">
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Subtitle>{birthdayFormatter(user.birthday)}</Card.Subtitle>
                    </Card.Body>
                </Card>

                <Card className="post" style={{ width: '36rem', marginTop: '30px' }} bg="danger" text="light">
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Filter Interests:</ListGroup.Item>
                        {user.interests && user.interests.map((value) => (
                            <ListGroup.Item key={value}>
                                <div className="interestList">
                                    {value}
                                    <input 
                                        type="checkbox" 
                                        className="customCheckbox" 
                                        checked={checkedInterests[value] || false} 
                                        onChange={() => handleCheckboxChange(value)} 
                                    />
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>

                <div className="interestListButtons">
                    <Button variant="danger" onClick={handleApply}>Apply</Button>
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                    {displayRefreshButton && (
                        <Button variant="primary" onClick={handleRefresh}>Refresh Results</Button>
                    )}
                </div>

                <h4 style={{ color: 'white' }}>
                    Maximum Price (USD): 
                    <input 
                        type="number" 
                        min="0" 
                        max="1000" 
                        value={sliderValue} 
                        onChange={(e) => {
                            let newValue = Math.max(0, Math.min(1000, parseInt(e.target.value)));
                            setSliderValue(newValue);
                        }}
                        style={{
                            backgroundColor: 'inherit',
                            color: 'inherit',
                            border: 'none',
                            outline: 'none',
                            textAlign: 'center',
                        }}
                    />
                </h4>
                <div className="slidecontainer">
                    <input
                        type="range" 
                        min="0" 
                        max="1000" 
                        value={sliderValue} 
                        className="slider"
                        id="myRange" 
                        onChange={(e) => setSliderValue(e.target.value)}
                    />
                </div>
                <div>
                    {amazonResults && amazonResults.map((value, index) => {
                        return (
                            <Card key={index} style={{ width: '36rem', marginTop: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Card.Img
                                    variant="top"
                                    src={value.productPhoto}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <Card.Body style={{ marginLeft: '15px' }}>
                                        <Card.Text>{value.productName}</Card.Text>
                                        <Card.Text>{value.productPrice}</Card.Text>
                                        <Card.Text>Rating: {value.productRating}</Card.Text>
                                        <a href={value.productURL} target="_blank" rel="noopener noreferrer">View on Amazon</a>
                                    </Card.Body>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ViewProfilePage;
