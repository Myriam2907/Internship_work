import React, { useState } from 'react';
import './Project.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectList = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            ProjectName: 'Myriam Ladhari',
            ClientID: '1',
            TeamMembers: 'Team Member 1, Team Member 2',
            StartDate: '2023-07-01',
            EndDate: '2023-07-31',
        },
        {
            id: 2,
            ProjectName: 'Sacha',
            ClientID: '2',
            TeamMembers: 'K.ML--F.FR',
            StartDate: '2023-07-05',
            EndDate: '2023-09-07',
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
    const [editProjectId, setEditProjectId] = useState(null);

    const toggle = () => {
        setModal(!modal);
        if (!modal) {
            setEditProjectId(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editProjectId) {
            // Update existing project
            const updatedProjects = projects.map((project) =>
                project.id === editProjectId ? { ...project, ...formValues } : project
            );
            setProjects(updatedProjects);
            setEditProjectId(null); // Reset editProjectId after update
        } else {
            // Add new project
            const newProject = {
                id: projects.length + 1,
                ...formValues,
            };
            setProjects((prevProjects) => [...prevProjects, newProject]);
        }
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
        setEditProjectId(id);
        const projectToEdit = projects.find((project) => project.id === id);
        if (projectToEdit) {
            setFormValues(projectToEdit);
            setModal(true);
        }
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
            <div className="breadcrumb-container">
                <Breadcrumb className="breadcrumb">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem active>Projects</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="add-button-container">
                <Button
                    onClick={toggle}
                    className="button button-primary"
                >
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />

                </Button>

                <Modal isOpen={modal} toggle={toggle}>


                    <ModalHeader toggle={toggle} className="Modal-header">
                        {editProjectId ? 'Edit Project' : 'Add Project'}
                    </ModalHeader>
                    <ModalBody className="Modal-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="ProjectName">Project</label>
                                <select
                                    type="text"
                                    id="ProjectName"
                                    name="ProjectName"
                                    value={formValues.ProjectName}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Project</option>
                                    <option value="Project 1">Project 1</option>
                                    <option value="Project 2">Project 2</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ClientID">Client</label>
                                <select
                                    id="ClientID"
                                    name="ClientID"
                                    value={formValues.ClientID}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Client</option>
                                    <option value="Client 1">Client 1</option>
                                    <option value="Client 2">Client 2</option>
                                </select>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter className="Modal-footer">
                        <Button color="primary" onClick={handleSubmit}>
                            {editProjectId ? 'Update' : 'Add'}
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
                    <th>Project </th>
                    <th>Client </th>

                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>

                        <td>{project.ProjectName}</td>
                        <td>{project.ClientID}</td>

                        <td className="project-actions">
                            <button
                                className="button button-primary"
                                onClick={() => handleEdit(project.id)}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className="button button-danger"
                                onClick={() => handleRemove(project.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
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
