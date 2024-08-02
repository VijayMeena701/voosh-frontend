import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    const { token } = await request.json();

    try {
        const apiResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);

        const { email, name } = apiResponse.data;

        const userResponse = await axios.post(`${process.env.BACKEND}/users/register`, { firstName: name, lastName: null, email, password: null });

        const jwtToken = userResponse.data.token;

        const response = NextResponse.json({ token: jwtToken });


        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 });
    }
}
