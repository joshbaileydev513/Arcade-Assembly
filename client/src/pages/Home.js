import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import {useQuery} from '@apollo/client';
import {GET_USERS} from '../utils/queries';
import '../styles/Home.css';

const Home = () => {

  const { loading, data } = useQuery(GET_USERS);
  const userData = data?.getUsers || [];
  console.log(userData.length);
  const numUsers = userData.length;

  const navigate = useNavigate(); // <-- Initialize useNavigate hook

  const handleSignupClick = () => {
    navigate('/signup'); // <-- Navigate to /signup route when Signup button is clicked
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (
    <Container>
      <Row class="row justify-content-center">
        <Col md={6} className="align-self-center text-center">
          <h1 className="website-title">Arcade Assembly</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <div className="shield-wrapper">
              <FontAwesomeIcon icon={faShield} size="lg" className="shield-icon" />
              <div className="shield-text">
                <p>Total Games</p>
                <span>244,277</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <div className="shield-wrapper">
              <FontAwesomeIcon icon={faShield} size="lg" className="shield-icon" />
              <div className="shield-text">
                <p>Total Players</p>
                <span> {numUsers} </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={7} className="text-center">
          <p className="goal-description">At Arcade Assembly, our goal is to create an inclusive gaming community, 
          making it more enjoyable and accessible for everyone. We aim to provide a platform for discovery, where like-minded players 
          can find games both popular and obscure so we all can participate in a growing gaming culture.</p> {/* <-- Added custom class */}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <h3 className="sign-up-text">New to Arcade Assembly, Signup Below!</h3>
          <button onClick={handleSignupClick}>Step In, The Assembly is About to Start</button> {/* <-- Added onClick handler */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;