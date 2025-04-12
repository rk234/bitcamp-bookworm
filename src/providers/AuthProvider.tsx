import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "../contexts/authContext"
import { onAuthStateChanged } from "firebase/auth"
import { UserProfile } from "../types/user"
import { auth } from "../config/firebase"
import { getUserById, loginOrRegisterUser, logoutUser } from "../services/authService"

type AuthProviderProps = {
  children?: ReactNode
}

type AuthState = {
  user?: UserProfile,
  token?: string,
  isAuthed: boolean,
  isLoading: boolean
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: undefined,
    token: undefined,
    isAuthed: false,
    isLoading: true
  })

  useEffect(() => {
    return onAuthStateChanged(auth, async (userInfo) => {
      console.log(`Auth state changed: ${userInfo?.email}`)
      if (userInfo != null) {
        const existingUser = await getUserById(userInfo.uid)

        //the user doc get put in the db after the auth event is sent, so this is needed :(
        const user = {
          displayName: existingUser ? existingUser.displayName : userInfo.displayName,
          uid: userInfo.uid,
          email: existingUser ? existingUser.email : userInfo.email
        } as UserProfile

        const token = await auth.currentUser?.getIdToken()
        setAuthState({
          isAuthed: true,
          token: token,
          user: user,
          isLoading: false
        })
      } else {
        setAuthState({
          isAuthed: false,
          token: undefined,
          user: undefined,
          isLoading: false
        })
      }
    })
  }, [])

  return <AuthContext.Provider
    value={{
      isAuthed: authState.isAuthed,
      isLoading: authState.isLoading,
      user: authState.user,
      token: authState.token,
      login: loginOrRegisterUser,
      logout: logoutUser,
      setUser: (user) => setAuthState({ ...authState, user: user })
    }}
  >
    {children}
  </AuthContext.Provider>
}
