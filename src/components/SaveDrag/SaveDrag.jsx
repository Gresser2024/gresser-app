import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DragDrop = () => {
  const [projects, setProjects] = useState({});
  const [draggedEmployee, setDraggedEmployee] = useState(null);
  const [sourceProject, setSourceProject] = useState(null);

  useEffect(() => {
    fetchProjectsAndEmployees();
  }, []);

  const fetchProjectsAndEmployees = async () => {
    try {
      const jobsResponse = await axios.get('/api/jobs');
      const employeesResponse = await axios.get('/api/employees');
      
      const projectsData = {};
      jobsResponse.data.forEach(job => {
        projectsData[job.job_name] = [];
      });

      employeesResponse.data.forEach(employee => {
        if (projectsData[employee.location]) {
          projectsData[employee.location].push(employee);
        }
      });

      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDragStart = (e, employee, projectName) => {
    setDraggedEmployee(employee);
    setSourceProject(projectName);
    e.dataTransfer.setData('text/plain', JSON.stringify(employee));
  };

  const handleDrop = async (e, projectName) => {
    e.preventDefault();
    if (sourceProject !== projectName && draggedEmployee) {
      try {
        await axios.put(`/api/employees/${draggedEmployee.id}`, { location: projectName });
        
        const updatedProjects = { ...projects };
        updatedProjects[sourceProject] = updatedProjects[sourceProject].filter(
          (emp) => emp.id !== draggedEmployee.id
        );
        updatedProjects[projectName].push(draggedEmployee);
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error updating employee location:', error);
      }
    }
    setDraggedEmployee(null);
    setSourceProject(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3>Drag and Drop Employees Between Projects</h3>
      {Object.keys(projects).map((projectName) => (
        <div
          key={projectName}
          style={{
            border: '1px solid #ccc',
            margin: '8px',
            padding: '8px',
            backgroundColor: '#f9f9f9'
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, projectName)}
        >
          <h4>{projectName}</h4>
          <ul>
            {projects[projectName].map((employee) => (
              <li
                key={employee.id}
                draggable
                onDragStart={(e) => handleDragStart(e, employee, projectName)}
                style={{
                  padding: '8px',
                  margin: '4px',
                  border: '1px solid #ccc',
                  cursor: 'move',
                  backgroundColor: draggedEmployee === employee ? '#e0e0e0' : 'white'
                }}
              >
                {employee.first_name} {employee.last_name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DragDrop;