import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Status: <span className={`font-medium ${project.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                  {project.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Budget: <span className="font-medium">${project.budget?.toLocaleString()}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;