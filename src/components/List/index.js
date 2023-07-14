import React, { useState } from 'react';
import './ComplaintList.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            time: '2023-07-09 10:30',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            time: '2023-07-08 14:15',
            description: 'Pellentesque ac nisi vel augue tincidunt condimentum.',
        },
        // Add more complaints as needed
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        clientName: '',
        projectName: '',
        complaintType: '',
        complaintDescription: '',
    });

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission and add new complaint
        const newComplaint = {
            id: complaints.length + 1,
            time: new Date().toLocaleString(),
            description: formValues.complaintDescription,
            // Add other form values to the complaint object
        };
        setComplaints((prevComplaints) => [...prevComplaints, newComplaint]);
        setModal(false);
        setFormValues({
            clientName: '',
            projectName: '',
            complaintType: '',
            complaintDescription: '',
        });
    };

    const handleEdit = (id) => {
        // Handle edit action for the complaint with the given ID
        console.log(`Edit complaint ${id}`);
    };

    const handleRemove = (id) => {
        // Handle remove action for the complaint with the given ID
        console.log(`Remove complaint ${id}`);
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
            <h2>Complaint List</h2>
            <div>
                <Button color="danger" onClick={toggle}>
                    Ajouter
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Ajouter Reclamation</ModalHeader>
                    <ModalBody>
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
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>
                            Ajouter
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <table className="complaint-table">
                <thead>
                <tr>
                    <th>Complaint ID</th>
                    <th>Complaint Time</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {complaints.map((complaint) => (
                    <tr key={complaint.id}>
                        <td>{complaint.id}</td>
                        <td>{complaint.time}</td>
                        <td>{complaint.description}</td>
                        <td>
                            <button onClick={() => handleEdit(complaint.id)}>Edit</button>
                            <button onClick={() => handleRemove(complaint.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintList;
