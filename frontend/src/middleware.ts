import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getUserProfile } from "./services";
const DOMAIN = "http://localhost:3000";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get("auth-token")?.value;
  const path = request.nextUrl.pathname;

  // making this call to validate the jwt
  const userProfile = await getUserProfile(token || "");
  console.log(userProfile, "userProfile");
  try {
    if (userProfile) {
      if (userProfile?.user_type === 1 && path !== "/type_1/home") {
        return NextResponse.redirect(new URL("/type_1/home", request.url));
      } else if (userProfile?.user_type === 2 && path !== "/type_2/home") {
        return NextResponse.redirect(new URL("/type_2/home", request.url));
      }
    } else {
      if (path !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (e) {
    console.log("handling error e", e);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/type_1/home", "/type_2/home"],
};
