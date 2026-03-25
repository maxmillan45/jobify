import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-100 cursor-pointer">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition">
          {job.title}
        </h2>
        <p className="text-gray-600 mb-3">{job.company}</p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="text-sm text-gray-500"> {job.location}</span>
          <span className="text-sm text-gray-500"> {job.type}</span>
          <span className="text-sm text-green-600 font-semibold"> {job.salary}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
        
        <button className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-medium">
          View Details
        </button>
      </div>
    </Link>
  )
}

export default JobCard