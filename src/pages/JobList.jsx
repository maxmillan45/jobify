import { useState } from 'react'
import JobCard from '../components/JobCard'

const JobList = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      description: "We're looking for an experienced React developer to join our team. You'll be building amazing user interfaces with modern technologies and working with a talented team of engineers."
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Software Inc",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      description: "Looking for a Node.js expert to build scalable APIs and microservices. You'll work with cutting-edge technologies and help shape our backend architecture."
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      salary: "$70,000 - $90,000",
      description: "Create beautiful user interfaces for our products. Work with product managers and developers to create intuitive and engaging user experiences."
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
      <p className="text-gray-600 mb-8">Browse through thousands of job opportunities</p>
      <div className="space-y-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default JobList