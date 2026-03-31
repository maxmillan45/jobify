// src/components/JobDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { mockJobs } from '../data/mockJobs';

const JobDetails = () => {
  const { id } = useParams();
  const job = mockJobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p className="company">{job.company}</p>
      <div className="info">
        <span>{job.location}</span>
        <span>{job.type}</span>
        <span>{job.salary}</span>
        <span>Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
      </div>
      
      <div className="section">
        <h2>Description</h2>
        <p>{job.description}</p>
      </div>
      
      <div className="section">
        <h2>Requirements</h2>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      <div className="section">
        <h2>Responsibilities</h2>
        <ul>
          {job.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </div>
      
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobDetails;