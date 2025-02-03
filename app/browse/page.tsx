"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart } from "lucide-react"
import { ReviewForm } from "@/components/ReviewForm"
import { ShareButtons } from "@/components/ShareButtons"
import { toast } from "@/hooks/use-toast"

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "Data Structures and Algorithms Notes",
    branch: "cse",
    year: "2",
    type: "notes",
    verifiedBy: "Srinath sir",
    rating: 4.5,
    topComment: {
      author: "Rahul M.",
      text: "Excellent notes, very comprehensive!",
    },
  },
  {
    id: 2,
    title: "Digital Electronics Assignment",
    branch: "ece",
    year: "1",
    type: "assignment",
    verifiedBy: "Prof. Praveen Kumar",
    rating: 3.8,
    topComment: {
      author: "Priya S.",
      text: "Good assignment, but could use more examples.",
    },
  },
  {
    id: 3,
    title: "Thermodynamics Notes",
    branch: "me",
    year: "3",
    type: "notes",
    verifiedBy: "Dr. Divya Sharma",
    rating: 4.2,
    topComment: {
      author: "Akash P.",
      text: "Very helpful for understanding complex concepts.",
    },
  },
  {
    id: 4,
    title: "Object-Oriented Programming Assignment",
    branch: "cse",
    year: "2",
    type: "assignment",
    verifiedBy: "Prof. Rajesh Gupta",
    rating: 4.7,
    topComment: {
      author: "Sneha R.",
      text: "Challenging but very informative assignment.",
    },
  },
  {
    id: 5,
    title: "Microprocessors and Microcontrollers Notes",
    branch: "ece",
    year: "3",
    type: "notes",
    verifiedBy: "Dr. Anita Desai",
    rating: 4.3,
    topComment: {
      author: "Vikram K.",
      text: "Well-structured notes, easy to follow.",
    },
  },
  {
    id: 6,
    title: "Machine Design Assignment",
    branch: "me",
    year: "4",
    type: "assignment",
    verifiedBy: "Prof. Suresh Patel",
    rating: 4.0,
    topComment: {
      author: "Neha G.",
      text: "Practical assignment, relates well to industry standards.",
    },
  },
  {
    id: 7,
    title: "Database Management Systems Notes",
    branch: "cse",
    year: "3",
    type: "notes",
    verifiedBy: "Dr. Priya Reddy",
    rating: 4.6,
    topComment: {
      author: "Rohan V.",
      text: "Comprehensive notes covering all aspects of DBMS.",
    },
  },
  {
    id: 8,
    title: "Analog Communication Assignment",
    branch: "ece",
    year: "2",
    type: "assignment",
    verifiedBy: "Prof. Vikram Singh",
    rating: 3.9,
    topComment: {
      author: "Aisha K.",
      text: "Good assignment, helps in understanding the concepts.",
    },
  },
  {
    id: 9,
    title: "Fluid Mechanics Notes",
    branch: "me",
    year: "2",
    type: "notes",
    verifiedBy: "Dr. Meera Nair",
    rating: 4.4,
    topComment: {
      author: "Siddharth T.",
      text: "Well-explained notes, easy to understand.",
    },
  },
  {
    id: 10,
    title: "Computer Networks Assignment",
    branch: "cse",
    year: "4",
    type: "assignment",
    verifiedBy: "Prof. Arun Kumar",
    rating: 4.8,
    topComment: {
      author: "Isha J.",
      text: "Challenging assignment, but very rewarding.",
    },
  },
  {
    id: 11,
    title: "Digital Signal Processing Notes",
    branch: "ece",
    year: "4",
    type: "notes",
    verifiedBy: "Dr. Sunita Mishra",
    rating: 4.5,
    topComment: {
      author: "Aditya R.",
      text: "Excellent notes, very helpful for exams.",
    },
  },
  {
    id: 12,
    title: "Heat Transfer Assignment",
    branch: "me",
    year: "3",
    type: "assignment",
    verifiedBy: "Prof. Rahul Verma",
    rating: 4.1,
    topComment: {
      author: "Riya S.",
      text: "Good assignment, covers all the important topics.",
    },
  },
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function BrowsePage() {
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [selectedResource, setSelectedResource] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredResources = mockResources.filter(
    (resource) =>
      (!branch || resource.branch === branch) && (!year || resource.year === year) && (!type || resource.type === type),
  )

  const handleReviewSubmit = (resourceId: number, rating: number, comment: string) => {
    console.log(`Review for resource ${resourceId}: ${rating} stars, "${comment}"`)
    toast({
      title: "Success",
      description: "Review submitted successfully.",
    })
    setSelectedResource(null)
  }

  const toggleFavorite = (resourceId: number) => {
    setFavorites((prev) => (prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]))
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Browse Resources</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Select onValueChange={setBranch} value={branch}>
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="cse">Computer Science Engineering</SelectItem>
            <SelectItem value="ece">Electronics and Communication Engineering</SelectItem>
            <SelectItem value="me">Mechanical Engineering</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setYear} value={year}>
          <SelectTrigger>
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="1">1st Year</SelectItem>
            <SelectItem value="2">2nd Year</SelectItem>
            <SelectItem value="3">3rd Year</SelectItem>
            <SelectItem value="4">4th Year</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setType} value={type}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="notes">Notes</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>
                {resource.branch.toUpperCase()} - Year {resource.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">Type: {resource.type}</p>
              <p className="text-sm text-gray-500 mb-2">Verified by: {resource.verifiedBy}</p>
              <StarRating rating={resource.rating} />
              <div className="mt-4 flex items-center space-x-2">
                <Button>Download</Button>
                <Button variant="outline" onClick={() => setSelectedResource(resource.id)}>
                  Review
                </Button>
                <ShareButtons url={`https://aitd-resource-hub.com/resource/${resource.id}`} title={resource.title} />
                <Button variant="outline" size="icon" onClick={() => toggleFavorite(resource.id)}>
                  <Heart className={`h-4 w-4 ${favorites.includes(resource.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              {resource.topComment && (
                <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm">
                  <p className="font-semibold">Top Comment</p>
                  <p className="text-xs">{resource.topComment.text}</p>
                  <span className="text-xs text-gray-500">- {resource.topComment.author}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
        
            <Button variant="outline" className="mt-4" onClick={() => setSelectedResource(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

