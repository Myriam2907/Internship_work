import React, { useState } from 'react';
import './Project.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ProjectList = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            ProjectName: 'Myriam Ladhari',
            ClientID: '',
            TeamMembers: '',
            StartDate: '',
            EndDate: '',
        },
        {
            id: 2,
            ProjectName: 'Sacha',
            ClientID: '',
            TeamMembers: '',
            StartDate: '',
            EndDate: '',
        },
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        ProjectName: '',
        ClientID: '',
        TeamMembers: '',
        StartDate: '',
        EndDate: '',
    });

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            id: projects.length + 1,
            ...formValues,
        };
        setProjects((prevProjects) => [...prevProjects, newProject]);
        setModal(false);
        setFormValues({
            ProjectName: '',
            ClientID: '',
            TeamMembers: '',
            StartDate: '',
            EndDate: '',
        });
    };

    const handleEdit = (id) => {
        console.log(`Editing Project with ID: ${id}`);
        // Add your edit logic here
    };

    const handleRemove = (id) => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        setProjects(updatedProjects);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="Project-list-container">
            <h2>Projects List</h2>
            <div className="add-button-container">
                <Button
                    onClick={toggle}
                    style={{
                        backgroundColor: '#00a19a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Add Project
                </Button>



                <Modal isOpen={modal} toggle={toggle} className="modal-container">
                    <ModalHeader toggle={toggle} className="modal-header">
                        Add Project
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="ProjectName">Project Name:</label>
                                <input
                                    type="text"
                                    id="ProjectName"
                                    name="ProjectName"
                                    value={formValues.ProjectName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="ClientID">Client ID:</label>
                                <input
                                    type="text"
                                    id="ClientID"
                                    name="ClientID"
                                    value={formValues.ClientID}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="TeamMembers">Team Members:</label>
                                <input
                                    type="text"
                                    id="TeamMembers"
                                    name="TeamMembers"
                                    value={formValues.TeamMembers}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="StartDate">Start Date:</label>
                                <input
                                    type="text"
                                    id="StartDate"
                                    name="StartDate"
                                    value={formValues.StartDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="EndDate">End Date:</label>
                                <input
                                    type="text"
                                    id="EndDate"
                                    name="EndDate"
                                    value={formValues.EndDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button color="primary" onClick={handleSubmit}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

            <table className="Project-table">
                <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Client ID</th>
                    <th>Team Members</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.ProjectName}</td>
                        <td>{project.ClientID}</td>
                        <td>{project.TeamMembers}</td>
                        <td>{project.StartDate}</td>
                        <td>{project.EndDate}</td>
                        <td>
                            <button className="button button-primary" onClick={() => handleEdit(project.id)}>
                                Edit
                            </button>
                            <button className="button button-danger" onClick={() => handleRemove(project.id)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectList;
