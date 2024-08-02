'use client';

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Box, Button, Typography, Paper, TextField, Container, Divider } from '@mui/material';
import React from 'react';

export default function Login() {
    const router = useRouter();

    const handleLoginSuccess = async (response: any) => {
        const token = response.credential;

        try {
            const apiResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).then(res => res.json());

            const { email } = apiResponse;

            const userResponse = await axios.post(`${process.env.BACKEND}/users/login`, { email, password: null, provider: "google" });

            const jwtToken = userResponse.data.token;
            localStorage.setItem("authToken", jwtToken)
            router.push('/');
        } catch (error) {
            alert("something went wrong")
            console.error('Error logging in with Google:', error);
        }
    };
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleLoginError = () => {
        console.error('Login Failed');
        alert("google login failed");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.BACKEND}/users/login`, { email, password });
            localStorage.setItem('authToken', response.data.token);
            router.push('/');
        } catch (error) {
            alert("something went wrong")
        }
    }

    return (
        <Container maxWidth="lg" sx={{ height: "calc(100dvh - 64px)" }} >
            <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center", maxWidth: 350, mx: "auto", gap: 2, pt: 10 }}>
                <Typography variant='h4' >Login</Typography>
                <Paper component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexFlow: "column", border: "1px solid #E7E7E7", borderRadius: 2, px: 2, py: 2, gap: 2, width: "100%" }}>
                    <TextField fullWidth label="Email" name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField fullWidth label="Password" name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type='submit' variant='contained'>Login</Button>
                    <Divider />
                    <Typography sx={{ textAlign: "center" }} >Don't have an account? <Link href="/signup" style={{ textDecoration: "none", color: "#2655A3" }}>Sign up</Link> </Typography>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}