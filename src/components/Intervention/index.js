import React, { useState } from 'react';
import './intervention.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const InterventionList = () => {
    const [interventions, setInterventions] = useState([
        {
            id: 1,
            ClientName: 'Myriam Ladhari',
            ProjectName: 'Gigi',
            Date: '28/05/2023',
        },
        {
            id: 2,
            ClientName: 'Sacha Doti ',
            ProjectName: 'loli',
            Date: '25/01/2023',
        },
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        id: null,
        clientName: '',
        projectName: '',
        date: '',
    });

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.id !== null) {
            // Edit existing intervention
            const updatedInterventions = interventions.map((intervention) => {
                if (intervention.id === formValues.id) {
                    return {
                        ...intervention,
                        clientName: formValues.clientName,
                        projectName: formValues.projectName,
                        date: formValues.date,
                    };
                }
                return intervention;
            });
            setInterventions(updatedInterventions);
        } else {
            // Add new intervention
            const newIntervention = {
                id: interventions.length + 1,
                clientName: formValues.clientName,
                projectName: formValues.projectName,
                date: formValues.date,
            };
            setInterventions((prevInterventions) => [...prevInterventions, newIntervention]);
        }

        setModal(false);
        setFormValues({
            id: null,
            clientName: '',
            projectName: '',
            date: '',
        });
    };


    const handleEdit = (id) => {
        console.log(`Editing Intervention with ID: ${id}`);
        const interventionToEdit = interventions.find((intervention) => intervention.id === id);
        if (interventionToEdit) {
            setFormValues({
                id: interventionToEdit.id,
                clientName: interventionToEdit.ClientName,
                projectName: interventionToEdit.ProjectName,
                date: interventionToEdit.Date,
            });
            setModal(true);
        }
    };

    const handleRemove = (id) => {
        const updatedInterventions = interventions.filter((intervention) => intervention.id !== id);
        setInterventions(updatedInterventions);
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
            <h2>Interventions List</h2>
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
                    Add Intervention
                </Button>
                <Modal isOpen={modal} toggle={toggle} className="modal-container">
                    <ModalHeader toggle={toggle} className="modal-header">
                        {formValues.id ? 'Edit Intervention' : 'Add Intervention'}
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
                                    type="date"
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
                            {formValues.id ? 'Update' : 'Add'}
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
                {interventions.map((intervention) => (
                    <tr key={intervention.id}>
                        <td>{intervention.id}</td>
                        <td>{intervention.ClientName}</td>
                        <td>{intervention.ProjectName}</td>
                        <td>{intervention.Date}</td>
                        <td>
                            <button
                                className="button button-primary"
                                onClick={() => handleEdit(intervention.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="button button-danger"
                                onClick={() => handleRemove(intervention.id)}
                            >
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

export default InterventionList;
