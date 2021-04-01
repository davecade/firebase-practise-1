import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state
        console.log("DESTRUCT:", displayName, email, password, confirmPassword)

        if(password !== confirmPassword) {
            alert("password don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            console.log("FIRST", displayName)
            console.log("SECOND", { displayName })
            console.log(user)

            await createUserProfileDocument(user, { displayName })
 
            // -- Clears the state to it is blank
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })


        } catch(error) {
            console.error(error);
        }
        
    }

    handleChange = event => {
        const { name, value } = event.target;
        
        this.setState({[name]: value})
    }


    render() {

        const { displayName, email, password, confirmPassword } = this.state
        
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type="submit">Sign UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;