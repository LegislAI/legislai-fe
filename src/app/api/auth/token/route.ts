import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'access_token';

const getTokenExpirationTime = (token: string) => {
  const { exp } = jwtDecode(token);

  return exp ? exp * 1000 : null;
};

export const isTokenExpired = (token: string) => {
  const expires = getTokenExpirationTime(token);

  return expires ? Date.now() >= expires : true;
};

export async function GET() {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token || isTokenExpired(token)) {
    return NextResponse.json({ token: null });
  }

  return NextResponse.json({ token });
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const expires = getTokenExpirationTime(token);
  const maxAge = expires ? (expires - Date.now()) / 1000 : 0;

  if (token) {
    cookies().set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: maxAge,
    });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  cookies().delete(AUTH_COOKIE);

  return NextResponse.json({ success: true });
}
