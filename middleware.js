import { NextResponse } from "next/server";
import { FRONTEND_BASE_URL, ifLoggedInRestrictedPaths, ifNotLoggedInRestrictedPaths } from "./constants/urlConstants";
import { AUTH_KEY_NAME } from "./constants/statusCodes";

export default function middleware(request) {
    const cookieValue = request.cookies.get(AUTH_KEY_NAME);
    let url = request.url;

    if (cookieValue) {
        const isRestrictedPath = ifLoggedInRestrictedPaths.some(path => url.includes(path));
        if (isRestrictedPath) {
            return NextResponse.redirect(`${FRONTEND_BASE_URL}`)
        }
    } else {
        const isRestrictedPath = ifNotLoggedInRestrictedPaths.some(path => url.includes(path));
        if (isRestrictedPath) {
            return NextResponse.redirect(`${FRONTEND_BASE_URL}`)
        }
    }
}
