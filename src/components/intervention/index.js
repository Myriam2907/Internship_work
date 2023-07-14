import React, { useState } from 'react';
import './intervention.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const InterventionList = () => {
    const [intervention, setIntervention] = useState([
        {
            id: 1,
            ClientName: 'Myriam Ladhari',
            ProjectName: 'Gigi',
            Date :'',

        },
        {
            id: 2,
            ClientName: 'Sacha',
            ProjectName: 'loli',
            Date :''
        },

        // Add more complaints as needed
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        clientName: '',
        projectName: '',
        date: ''

    });

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission and add new complaint
        const newIntervention = {
            id: intervention.length + 1,
            date: new Date().toLocaleString(),

        };
        setIntervention((prevIntervention) => [...prevIntervention, newIntervention]);
        setModal(false);
        setFormValues({
            clientName: '',
            projectName: '',
            date: ''
        });
    };

    const handleEdit = (id) => {
        console.log(`Editing Intervention with ID: ${id}`);
        // Add your edit logic here
    };


    const handleRemove = (id) => {
        // Create a new array without the complaint with the given id
        const updatedIntervention = intervention.filter((intervention) => intervention.id !== id);

        // Update the data source with the updated array of complaints
        setIntervention(updatedIntervention);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="intervention-list-container">
            <h2>Intervention List</h2>
            <div className="add-button-container">
                <Button color="danger" onClick={toggle}>
                    Add Intervention
                </Button>
                <Modal isOpen={modal} toggle={toggle}  className="modal-container">
                    <ModalHeader toggle={toggle} className="modal-header">
                        Add Intervention
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
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="text"
                                    id="date"
                                    name="date"
                                    value={formValues.date}
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


            <table className="intervention-table">
                <thead>
                <tr>
                    <th>Intervention ID</th>
                    <th>Client Name</th>
                    <th>Project Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {intervention.map((complaint) => (
                    <tr key={intervention.id}>
                        <td>{intervention.id}</td>
                        <td>{intervention.ClientName}</td>
                        <td>{intervention.ProjectName}</td>
                        <td>{intervention.date}</td>
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

export default InterventionList;
