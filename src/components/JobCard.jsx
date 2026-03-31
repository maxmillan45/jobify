// src/components/JobCard.jsx
import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
      <p className="type">{job.type}</p>
      <p className="salary">{job.salary}</p>
      <p className="description">{job.description.substring(0, 150)}...</p>
      <button className="view-details">View Details</button>
    </div>
  );
};

export default JobCard;