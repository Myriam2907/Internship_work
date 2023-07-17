import React, { useState } from 'react';
import './ComplaintList.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            ClientName: 'Myriam Ladhari',
            ProjectName: 'Gigi',
            ComplaintType: 'huh',
            ComplaintDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            ClientName: 'Sacha',
            ProjectName: 'loli',
            ComplaintType: 'gui',
            ComplaintDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
                time: new Date().toLocaleString(),
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
            <h2>Complaints List</h2>
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
                    Add Complaint
                </Button>
                <Modal isOpen={modal} toggle={toggle} className="modal-container">
                    <ModalHeader toggle={toggle} className="modal-header">
                        {modalMode === 'add' ? 'Add Complaint' : 'Edit Complaint'} {/* Display the mode in the modal header */}
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="clientName">Client Name:</label>
                                <input
                                    type="text"
                                    id="clientName"
                                    name="clientName"
                                    value={formValues.clientName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="projectName">Project Name:</label>
                                <input
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    value={formValues.projectName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="complaintType">Complaint Type:</label>
                                <input
                                    type="text"
                                    id="complaintType"
                                    name="complaintType"
                                    value={formValues.complaintType}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="complaintDescription">Complaint Description:</label>
                                <textarea
                                    id="complaintDescription"
                                    name="complaintDescription"
                                    value={formValues.complaintDescription}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button color="primary" onClick={handleSubmit}>
                            {modalMode === 'add' ? 'Add' : 'Update'} {/* Display the action button label based on the mode */}
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>


            <table className="complaint-table">
                <thead>
                <tr>
                    <th>Complaint ID</th>
                    <th>Client Name</th>
                    <th>Project Name</th>
                    <th>Complaint Type</th>
                    <th>Complaint Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {complaints.map((complaint) => (
                    <tr key={complaint.id}>
                        <td>{complaint.id}</td>
                        <td>{complaint.ClientName}</td>
                        <td>{complaint.ProjectName}</td>
                        <td>{complaint.ComplaintType}</td>
                        <td>{complaint.ComplaintDescription}</td>
                        <td>
                            <button className="button button-primary" onClick={() => handleEdit(complaint.id)}>Edit</button>
                            <button className="button button-danger" onClick={() => handleRemove(complaint.id)}>Remove</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintList;
