import { createContext } from "react";
import { loginOrRegisterUser, logoutUser } from "../services/authService.ts";
import { UserProfile } from "../types/user";

export type AuthProviderContext = {
  user?: UserProfile;
  token?: string;
  isAuthed: boolean;
  isLoading: boolean
  login: () => Promise<UserProfile>
  logout: () => Promise<void>
  setUser: (newUserData: UserProfile) => void
}

export const AuthContext = createContext<AuthProviderContext>({
  isAuthed: false,
  isLoading: true,
  login: loginOrRegisterUser,
  logout: logoutUser,
  setUser: () => { }
})
