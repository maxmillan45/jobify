import { useState } from 'react'
import JobCard from '../components/JobCard'

const JobList = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      description: "We're looking for a React developer to join our team."
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Software Inc",
      location: "New York",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      description: "Looking for a Node.js expert to build APIs."
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      salary: "$70,000 - $90,000",
      description: "Create beautiful user interfaces for our products."
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Dream Job</h1>
      <div className="space-y-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default JobList