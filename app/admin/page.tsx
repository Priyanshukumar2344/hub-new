"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type User = {
  id: string
  name: string
  collegeId: string
}

type File = {
  id: string
  name: string
  branch: string
  year: string
  type: string
  uploadedBy: string
}

export default function AdminDashboard() {
  const { isAdmin } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (!isAdmin) {
      router.push("/")
    } else {
      // Fetch users and files data
      // In a real application, you'd make API calls to your backend here
      setUsers([
        { id: "1", name: "John Doe", collegeId: "CS001" },
        { id: "2", name: "Jane Smith", collegeId: "EC002" },
      ])
      setFiles([
        { id: "1", name: "Data Structures Notes.pdf", branch: "CSE", year: "2", type: "notes", uploadedBy: "1" },
        {
          id: "2",
          name: "Digital Electronics Assignment.docx",
          branch: "ECE",
          year: "1",
          type: "assignment",
          uploadedBy: "2",
        },
      ])
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>College ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.collegeId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Uploaded Files</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Uploaded By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.branch}</TableCell>
              <TableCell>{file.year}</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>{users.find((u) => u.id === file.uploadedBy)?.name || "Unknown"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

