import React, { useState } from 'react';
import './client.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ClientList = () => {
    const [clients, setClients] = useState([
        {
            reference: '#1F3H34J',
            ClientName: 'Client 1',
            Email: 'client1@gmail.com',
            PhoneNb: '90898776',
        },
        {
            reference: '#2H7K5FK',
            ClientName: 'Client 2',
            Email: 'client2@gmail.com',
            PhoneNb: '34245378',
        },
        // Add more clients as needed
    ]);



    const [modal, setModal] = useState(false);

    const [formValues, setFormValues] = useState({
        reference: '',
        clientName: '',
        Email: '',
        PhoneNb: '',
    });

    const toggle = () => {
        setModal(!modal);
        setEditMode(false); // Reset edit mode when modal is closed
    };

    const [editMode, setEditMode] = useState(false); // Add editMode state

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            // Handle form submission and update existing client
            const updatedClients = clients.map((client, index) =>
                index === formValues.id ? { ...client, ...formValues } : client
            );
            setClients(updatedClients);
        } else {
            // Handle form submission and add new client
            const newClient = {
                reference: formValues.reference,
                ClientName: formValues.clientName,
                Email: formValues.Email,
                PhoneNb: formValues.PhoneNb,
            };
            setClients((prevClients) => [...prevClients, newClient]);
        }

        setModal(false);
        setFormValues({
            reference: '',
            clientName: '',
            Email: '',
            PhoneNb: '',
        });
    };

    const handleEdit = (index) => {
        console.log(`Editing Client at index: ${index}`);
        const clientToEdit = clients[index];
        if (clientToEdit) {
            setFormValues({
                id: index,
                reference: clientToEdit.reference,
                clientName: clientToEdit.ClientName,
                Email: clientToEdit.Email,
                PhoneNb: clientToEdit.PhoneNb,
            });
            setEditMode(true);
            setModal(true);
        }
    };

    const handleRemove = (index) => {
        // Create a new array without the client at the given index
        const updatedClients = [...clients];
        updatedClients.splice(index, 1);
        // Update the data source with the updated array of clients
        setClients(updatedClients);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="Client-list-container">
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem active>Clients </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="add-button-container">
                <Button
                    onClick={toggle}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#007bff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px', color: '#007bff' }} />
                </Button>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} className="modal-header">
                        {editMode ? 'Edit Client' : 'Add Client'}
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="reference">Reference</label>
                                <input
                                    type="text"
                                    id="reference"
                                    name="reference"
                                    value={formValues.reference}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="clientName">Client Name:</label>
                                <input
                                    type="text"
                                    id="clientName"
                                    name="clientName"
                                    value={formValues.clientName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Email">Email:</label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="Email"
                                    placeholder="example@exp.com"
                                    value={formValues.Email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="PhoneNb">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="PhoneNb"
                                    name="PhoneNb"
                                    placeholder="00 000 000"
                                    pattern="[0-9]{8}"
                                    title="Please enter an 8-digit number"
                                    value={formValues.PhoneNb}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <ModalFooter className="modal-footer">
                                <Button color="secondary" style={{ backgroundColor: '#CCCCCC', color: '#333' }} onClick={toggle}>
                                    Cancel
                                </Button>
                                <Button color="primary" style={{ backgroundColor: '#007BFF', color: '#fff' }} type="submit">
                                    {editMode ? 'Update' : 'Add'}
                                </Button>
                            </ModalFooter>

                        </form>
                    </ModalBody>
                </Modal>
            </div>
            <table className="Client-table">
                <thead>
                <tr>
                    <th>Reference</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th></th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <td>{client.reference}</td>
                        <td>{client.ClientName}</td>
                        <td>{client.Email}</td>
                        <td>{client.PhoneNb}</td>
                        <td></td>
                        <td>
                            <button className="button button-primary" onClick={() => handleEdit(index)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="button button-danger" onClick={() => handleRemove(index)}>
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

export default ClientList;
