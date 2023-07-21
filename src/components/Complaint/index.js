import React, { useState } from 'react';
import './ComplaintList.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
const ComplaintList = () => {
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            ClientName: 'Client 1',
            ProjectName: 'Project 2',
            ComplaintDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            ClientName: 'Client 2',
            ProjectName: 'Project 1',
            ComplaintDescription: 'Sed sodales erat vel eros congue, sed laoreet sem accumsan.',
        },

        // Add more complaints as needed
    ]);

    const [modal, setModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // Define the modal mode state
    const [formValues, setFormValues] = useState({
        clientName: '',
        projectName: '',
        complaintType: '',
        complaintDescription: '',
    });

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'add') {
            // Handle form submission and add new complaint
            const newComplaint = {
                id: complaints.length + 1,
                description: formValues.complaintDescription,
                // Add other form values to the complaint object
            };
            setComplaints((prevComplaints) => [...prevComplaints, newComplaint]);
        } else if (modalMode === 'edit') {
            // Handle form submission and update the existing complaint
            // Find the complaint with the matching ID
            const updatedComplaints = complaints.map((complaint) =>
                complaint.id === formValues.id ? { ...complaint, ...formValues } : complaint
            );
            setComplaints(updatedComplaints);
        }

        setModal(false);
        setFormValues({
            clientName: '',
            projectName: '',
            complaintType: '',
            complaintDescription: '',
        });
    };


    const handleEdit = (id) => {
        console.log(`Editing complaint with ID: ${id}`);
        // Find the complaint with the matching ID
        const complaintToEdit = complaints.find((complaint) => complaint.id === id);
        if (complaintToEdit) {
            // Set the form values with the complaint data
            setFormValues({
                id: complaintToEdit.id, // Add the ID to the form values
                clientName: complaintToEdit.ClientName,
                projectName: complaintToEdit.ProjectName,
                complaintType: complaintToEdit.ComplaintType,
                complaintDescription: complaintToEdit.ComplaintDescription,
            });
            // Set the mode to "edit" and open the modal
            setModalMode('edit');
            setModal(true);
        }
    };


    const handleRemove = (id) => {
        // Create a new array without the complaint with the given id
        const updatedComplaints = complaints.filter((complaint) => complaint.id !== id);

        // Update the data source with the updated array of complaints
        setComplaints(updatedComplaints);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="complaint-list-container">
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem active>Complaints</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="add-button-container">
                <Button
                    onClick={toggle}
                    style={{
                        backgroundColor: 'transparent',
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
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px', color: '#007bff' }} />
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader toggle={toggle} className="modal-header">
                            {modalMode === 'add' ? 'Add Complaint' : 'Edit Complaint'}
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: 1, marginRight: '10px' }}>
                                    <label htmlFor="clientName">Client:</label>
                                    <select
                                        id="clientName"
                                        name="clientId"
                                        value={formValues.clientId}
                                        onChange={handleInputChange}
                                        required
                                        style={{ width: '100%', height: '40px' }}
                                    >
                                        <option value="">Select Client</option>
                                        {complaints.map((complaint) => (
                                            <option key={complaint.id} value={complaint.ClientName}>
                                                {complaint.ClientName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ flex: 1, marginRight: '10px' }}>
                                    <label htmlFor="projectName">Project:</label>
                                    <select
                                        id="projectName"
                                        name="projectName"
                                        value={formValues.projectName}
                                        onChange={handleInputChange}
                                        required
                                        style={{ width: '100%', height: '40px' }}
                                    >
                                        <option value="">Select Project</option>
                                        {complaints.map((complaint) => (
                                            <option key={complaint.id} value={complaint.ProjectName}>
                                                {complaint.ProjectName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="complaintDescription"> Description:</label>
                                <textarea
                                    id="complaintDescription"
                                    name="complaintDescription"
                                    value={formValues.complaintDescription}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter className="modal-footer">
                            <Button
                                color="secondary"
                                style={{ backgroundColor: '#CCCCCC', color: '#333' }}
                                onClick={toggle}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                style={{ backgroundColor: '#007BFF', color: '#fff' }}
                                onClick={handleSubmit}
                            >
                                {formValues.id ? 'Update' : 'Add'}
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
            <table className="complaint-table">

                    <thead>
                    <tr>
                        <th>Client</th>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {complaints.map((complaint) => (
                        <tr key={complaint.id}>
                            <td>{complaint.ClientName}</td>
                            <td>{complaint.ProjectName}</td>
                            <td>{complaint.ComplaintDescription}</td>
                            <td>
                                <button
                                    className="button button-primary"
                                    onClick={() => handleEdit(complaint.id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    className="button button-danger"
                                    onClick={() => handleRemove(complaint.id)}
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

export default ComplaintList;