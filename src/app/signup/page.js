"use client";

import React from "react";
import styles from './signup.module.css';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';


const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}>Sign up</div>
                <div className={styles.underline}></div>
            </div>
            <div className={styles.inputs}>
                <div className={styles.input}>
                <PersonIcon style={{ fontSize: '20px', color: '#333' }} />
                    <input type="text" placeholder="Name" />
                </div>
                <div className={styles.input}>
                <MailIcon style={{ fontSize: '20px', color: '#333' }} />
                    <input type="email" placeholder="Email " />
                </div>
                <div className={styles.input}>
                <LockIcon style={{ fontSize: '20px', color: '#333' }} />
                    <input type="password"  placeholder="password"/>
                </div>
            </div>
            <div className={styles.submitContainer}>
                <div className={styles.submit}>Sign Up</div>
            </div>
        </div>
    );
};

export default Login;
