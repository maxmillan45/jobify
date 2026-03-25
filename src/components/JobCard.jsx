const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-3">{job.company}</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <span className="text-sm text-gray-500"> {job.location}</span>
        <span className="text-sm text-gray-500">{job.type}</span>
        <span className="text-sm text-green-600 font-semibold"> {job.salary}</span>
      </div>
      
      <p className="text-gray-600 mb-4">{job.description}</p>
      
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Apply Now
      </button>
    </div>
  )
}

export default JobCard