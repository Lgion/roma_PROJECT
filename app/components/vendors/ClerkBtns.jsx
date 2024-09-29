import {
    UserButton,
    SignIn,
    SignUp,
    SignedIn,
    SignedOut,
    ClerkLoaded,
    ClerkLoading
} from "@clerk/nextjs"

export default ({children}) => <>
    {children}
    <ClerkLoading>
      <div>Clerk is loading</div>
    </ClerkLoading>
    <ClerkLoaded>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <SignedOut>
            <SignIn />
            <SignUp />
        </SignedOut>
    </ClerkLoaded>
</>
