import React, { useState } from 'react';
import './intervention.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const InterventionList = () => {
    const [interventions, setInterventions] = useState([
        { id: 1, ClientName: 'Client 1', ProjectName: 'Project 2', Date: '28/05/2023' ,Description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        { id: 2, ClientName: 'Client 2', ProjectName: 'Project 1', Date: '25/01/2023' ,Description:'Sed sodales erat vel eros congue, sed laoreet sem accumsan'},
        // Add more interventions as needed
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        id: null,
        clientName: '',
        projectName: '',
        date: '',
        description:'',
    });

    const toggle = () => {
        setModal(!modal);
        setFormValues({
            id: null,
            clientName: '',
            projectName: '',
            date: '',
            description:'',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.id !== null) {
            // Edit existing intervention
            const updatedInterventions = interventions.map((intervention) => {
                if (intervention.id === formValues.id) {
                    return {
                        ...intervention,
                        ClientName: formValues.clientName,
                        ProjectName: formValues.projectName,
                        Date: formValues.date,
                        Description:formValues.description,
                    };
                }
                return intervention;
            });
            setInterventions(updatedInterventions);
        } else {
            // Add new intervention with a unique ID
            const newIntervention = {
                id: Date.now(), // Use a unique value, such as a timestamp
                ClientName: formValues.clientName,
                ProjectName: formValues.projectName,
                Date: formValues.date,
                Description:formValues.description,
            };
            setInterventions((prevInterventions) => [...prevInterventions, newIntervention]);
        }

        setModal(false);
        setFormValues({
            id: null,
            clientName: '',
            projectName: '',
            date: '',
            description:'',
        });
    };

    const handleEdit = (id) => {
        console.log(`Editing Intervention with ID: ${id}`);
        const index = interventions.findIndex((intervention) => intervention.id === id);
        if (index !== -1) {
            const interventionToEdit = interventions[index];
            setFormValues({
                id: interventionToEdit.id,
                clientName: interventionToEdit.ClientName,
                projectName: interventionToEdit.ProjectName,
                date: interventionToEdit.Date,
                description: interventionToEdit.Description,
            });
            setModal(true);
        }
    };

    const formatDateForInput = (dateString) => {
        if (dateString === '') return ''; // Handle the case when the date is empty
        const dateParts = dateString.split('/');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        return formattedDate;
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
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem active>Interventions </BreadcrumbItem>
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
                <Modal isOpen={modal} toggle={toggle} className="custom-modal">
                    <ModalHeader toggle={toggle} className="modal-header">
                        {formValues.id ? 'Edit Intervention' : 'Add Intervention'}
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 1, marginRight: '10px' }}>
                                        <Label for="clientName">Client:</Label>
                                        <Input
                                            type="select"
                                            id="clientName"
                                            name="clientName"
                                            value={formValues.clientName}
                                            onChange={handleInputChange}
                                            style={{ width: '100%', height: '40px' }}
                                        >
                                            <option value="">Select Client</option>
                                            {interventions.map((intervention) => (
                                                <option key={intervention.id} value={intervention.ClientName}>
                                                    {intervention.ClientName}
                                                </option>
                                            ))}
                                        </Input>
                                    </div>
                                    <div style={{ flex: 1, marginRight: '10px' }}>
                                        <Label for="projectName">Project:</Label>
                                        <Input
                                            type="select"
                                            id="projectName"
                                            name="projectName"
                                            value={formValues.projectName}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: '100%', height: '40px' }}
                                        >
                                            <option value="">Select Project</option>
                                            {interventions.map((intervention) => (
                                                <option key={intervention.id} value={intervention.ProjectName}>
                                                    {intervention.ProjectName}
                                                </option>
                                            ))}
                                        </Input>
                                    </div>

                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="date">Date:</Label>
                                <Input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formatDateForInput(formValues.date)} // Use value instead of defaultValue
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description:</Label>
                                <textarea

                                    id="description"
                                    rows={5}

                                    name="description"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <ModalFooter className="modal-footer" >

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

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            <table className="intervention-table">
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Project</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {interventions.map((intervention, index) => (
                    <tr key={index}>
                        <td>{intervention.ClientName}</td>
                        <td>{intervention.ProjectName}</td>
                        <td>{intervention.Date}</td>
                        <td>{intervention.Description}</td>
                        <td>
                            <button className="button button-primary" onClick={() => handleEdit(intervention.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="button button-danger" onClick={() => handleRemove(intervention.id)}>
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

export default InterventionList;
