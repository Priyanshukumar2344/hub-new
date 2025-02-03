"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type User = {
  id: string
  collegeId: string
  name: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (collegeId: string, dob: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (collegeId: string, dob: string) => {
    // Here you would typically validate the credentials with your backend
    // For now, we'll simulate an API call and create a mock user
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    const mockUser: User = {
      id: "1",
      collegeId,
      name: "John Doe",
      isAdmin: collegeId === "admin123", // Make 'admin123' an admin user
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

