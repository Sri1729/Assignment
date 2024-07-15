import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getUserProfile } from "./services";
const DOMAIN = "http://localhost:3000";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get("auth-token")?.value;

  // making this call to validate the jwt
  const userProfile = await getUserProfile(token || "");
  console.log(userProfile, "userProfile");
  if (token) {
    try {
      if (userProfile?.user_type === 1) {
        return NextResponse.redirect(new URL("/type_1_home", request.url));
      } else if (userProfile?.user_type === 2) {
        return NextResponse.redirect(new URL("/type_2_home", request.url));
      }
    } catch (e) {
      console.log("handling error e", e);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
