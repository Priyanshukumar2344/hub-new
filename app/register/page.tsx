"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [collegeId, setCollegeId] = useState("")
  const [dob, setDob] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && collegeId && dob) {
      // Here you would typically send the registration data to your backend
      // For now, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
      toast({
        title: "Success",
        description: "Registration successful. Please log in.",
      })
      router.push("/login")
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Register New Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="collegeId">College ID</Label>
              <Input
                type="text"
                placeholder="Enter your college ID"
                id="collegeId"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4">
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

