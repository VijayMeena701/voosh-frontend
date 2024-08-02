'use client';

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Box, Button, Typography, Paper, TextField, Container, Divider } from '@mui/material';
import React from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';


export default function Signup() {
    const router = useRouter();

    const handleLoginSuccess = async (response: any) => {
        const token = response.credential;

        try {
            const apiResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);

            const { email, name } = apiResponse.data;

            const userResponse = await axios.post(`${process.env.BACKEND}/users/register`, { firstName: name, lastName: null, email, password: null });

            const jwtToken = userResponse.data.token;
            localStorage.setItem("authToken", jwtToken)
            router.push('/');
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };

    const [loading, setLoading] = React.useState(false);

    const validateSchema = Yup.object().shape({
        firstName: Yup.string().required("This field is required"),
        lastName: Yup.string().notRequired(),
        email: Yup.string().email("Please enter a valid email").required("This field is required"),
        password: Yup.string()
            .required("This field is required")
            .min(8, "Pasword must be 8 or more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
        confirmPassword: Yup.string().when("password", (password, field) => {
            if (password) {
                return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
            }
        }),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validateSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);

            try {
                const response = await axios.post(`${process.env.BACKEND}/users/register`, values);
                localStorage.setItem('authToken', response.data.token)
                resetForm();
                router.push('/');
            } catch (error) {
                alert("something went wrong")
            } finally {
                setLoading(false)
            }

        },
    });

    const handleLoginError = () => {
        console.error('Signup Failed');
    };

    return (
        <Container maxWidth="lg" sx={{ height: "calc(100dvh - 64px)" }} >
            <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center", maxWidth: 350, mx: "auto", gap: 2, pt: 10 }}>
                <Typography variant='h4' >Signup</Typography>
                <Paper component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexFlow: "column", border: "1px solid #E7E7E7", borderRadius: 2, px: 2, py: 2, gap: 2, width: "100%" }}>
                    <TextField fullWidth size="small" label="First Name" name='firstName' type='text' helperText={formik.errors.firstName ? formik.errors.firstName : ""} error={formik.errors.firstName ? true : false} value={formik.values.firstName} onChange={formik.handleChange} />
                    <TextField fullWidth size="small" label="Last Name" name='lastName' type='text' helperText={formik.errors.lastName ? formik.errors.lastName : ""} error={formik.errors.lastName ? true : false} value={formik.values.lastName} onChange={formik.handleChange} />
                    <TextField fullWidth size="small" label="Email" name='email' type='email' helperText={formik.errors.email ? formik.errors.email : ""} error={formik.errors.email ? true : false} value={formik.values.email} onChange={formik.handleChange} />
                    <TextField fullWidth size="small" label="Password" name='password' type='password' helperText={formik.errors.password ? formik.errors.password : ""} error={formik.errors.password ? true : false} value={formik.values.password} onChange={formik.handleChange} />
                    <TextField fullWidth size="small" label="Confirm Password" name='confirmPassword' type='password' helperText={formik.errors.confirmPassword ? formik.errors.confirmPassword : ""} error={formik.errors.confirmPassword ? true : false} value={formik.values.confirmPassword} onChange={formik.handleChange} />
                    <Button type='submit' variant='contained'>Signup</Button>
                    <Divider />
                    <Typography sx={{ textAlign: "center" }} >Already have an account? <Link href="/login" style={{ textDecoration: "none", color: "#2655A3" }}>Login</Link> </Typography>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}