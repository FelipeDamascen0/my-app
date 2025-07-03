import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    console.log("Login recebido:", username);

    const apiRes = await fetch("http://localhost:5053/v1/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!apiRes.ok) {
      console.error("Erro na API externa:", apiRes.status);
      return NextResponse.json({ message: "Login inválido" }, { status: 401 });
    }

    const { token } = await apiRes.json();
    const response = NextResponse.json({ token });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Erro interno no login API:", error);
    return NextResponse.json(
        { message: error?.message ?? JSON.stringify(error) ?? "Erro desconhecido" },
        { status: 500 }
    );
  }
}