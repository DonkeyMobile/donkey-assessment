import React, { useEffect, useState } from 'react';
import './style.css';
import apple from "../../assets/icons/Vector (20).png"
import facebook from "../../assets/icons/Vector (21).png"
import gmail from "../../assets/icons/grommet-icons_google.png"
import passwordIcon from '../../assets/icons/Vector.png'
import { Link, useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    interface Login {
        email: string;
        password: string;
    }

    const [signin, setSignin] = useState<Login>({
        email: "",
        password: ""
    })
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignin({ ...signin, email: event.target.value })
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignin({ ...signin, password: event.target.value })
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if(signin.email && signin.password !== ""){
            navigate('/homepage');
        }
        event.preventDefault();
    };

    return (
        <div className='container'>
            <div className='signing-container'></div>

            <div className="contents">
                <h5 className="signinTitle">Login</h5>

                <form className="signing-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="input"
                            type={"text"}
                            id={"email"}
                            value={signin.email}
                            placeholder='Email Address'
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <div className='passwordParent'>
                            <input className="input passwordStyle"
                                type={"password"}
                                id={"password"}
                                placeholder='Password'
                                value={signin.password}
                                onChange={handlePasswordChange}
                            />
                            <img src={passwordIcon} className='passwordIcon' alt="password"/>
                        </div>

                        <Link to={'/'} className='forgot'>
                            <h5>
                                Forgot password?
                            </h5>
                        </Link>
                    </div>
                        <button className="loginbutton" type="submit">Login</button>

                    <div className='otherLogin_container'>
                        <h5 className='otherloginbox'>Or login with</h5>
                        <div className='box_parent'>
                            <div className='box_styles'>
                                <img src={gmail} alt="gmail"/>
                            </div>
                            <div className='box_styles'>
                                <img src={apple} alt="apple"/>
                            </div>
                            <div className='box_styles'>
                                <img src={facebook} alt="facebook"/>
                            </div>
                        </div>
                    </div>
                </form>

                <Link to={'/'} className='signupText'>
                    Don’t have an account? <span>Signup</span>
                </Link>
            </div>
        </div>
    );
};
export default SignInPage;