// https://clerk.com/docs/components/overview
import { auth, SignedIn, SignedOut, SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs"

export default function Auth() {
    const { userId } = auth()
    // if (SignedOut) // NE FONCTIONNE PAS....
    if (!userId)
        return <SignInButton />
    return <UserButton />
}
