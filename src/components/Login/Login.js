import React, { useContext } from 'react';
import firebase from "firebase/app";
import './Login.css'
import "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    var provider = new firebase.auth.GoogleAuthProvider();
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleLogin = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName, email} = result.user;
                const signInUser = {name:displayName, email}
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    return (
        <div>
            <h1>{loggedInUser.name}</h1>
            <h1>{loggedInUser.email}</h1>
            <Form className='container logInForm'>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Do you have an account?" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={handleGoogleLogin} variant="primary">
                    google signup
                </Button>
            </Form>
        </div>
    );
};

export default Login;