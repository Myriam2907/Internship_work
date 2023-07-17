import React, { useState } from 'react';
import './client.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ClientList = () => {
    const [clients, setClients] = useState([
        {
            id: 1,
            ClientName: 'Myriam Ladhari',
            Email: 'maya@gmail.com',
            PhoneNb: '90898776',
        },
        {
            id: 2,
            ClientName: 'Sacha Doti',
            Email: 'sacha@gmail.com',
            PhoneNb: '34245378',
        },
        // Add more clients as needed
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        clientName: '',
        Email: '',
        PhoneNb: '',
    });
    const [editMode, setEditMode] = useState(false); // Add editMode state

    const toggle = () => {
        setModal(!modal);
        setEditMode(false); // Reset edit mode when modal is closed
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            // Handle form submission and update existing client
            const updatedClients = clients.map((client) =>
                client.id === formValues.id ? { ...client, ...formValues } : client
            );
            setClients(updatedClients);
        } else {
            // Handle form submission and add new client
            const newClient = {
                id: clients.length + 1,
                ClientName: formValues.clientName,
                Email: formValues.Email,
                PhoneNb: formValues.PhoneNb,
            };
            setClients((prevClients) => [...prevClients, newClient]);
        }

        setModal(false);
        setFormValues({
            clientName: '',
            Email: '',
            PhoneNb: '',
        });
    };

    const handleEdit = (id) => {
        console.log(`Editing Client with ID: ${id}`);
        const clientToEdit = clients.find((client) => client.id === id);
        if (clientToEdit) {
            setFormValues({
                id: clientToEdit.id,
                clientName: clientToEdit.ClientName,
                Email: clientToEdit.Email,
                PhoneNb: clientToEdit.PhoneNb,
            });
            setEditMode(true);
            setModal(true);
        }
    };

    const handleRemove = (id) => {
        // Create a new array without the client with the given id
        const updatedClients = clients.filter((client) => client.id !== id);
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
            <h2>Clients List</h2>
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
                    Add Client
                </Button>
                <Modal isOpen={modal} toggle={toggle} className="modal-container">
                    <ModalHeader toggle={toggle} className="modal-header">
                        {editMode ? 'Edit Client' : 'Add Client'}
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
                                <label htmlFor="Email">Email:</label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="Email"
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
                                    pattern="[0-9]{8}"
                                    title="Please enter an 8-digit number"
                                    value={formValues.PhoneNb}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <ModalFooter className="modal-footer">
                                <Button color="primary" type="submit">
                                    {editMode ? 'Update' : 'Add'}
                                </Button>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
            <table className="Client-table">
                <thead>
                <tr>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.ClientName}</td>
                        <td>{client.Email}</td>
                        <td>{client.PhoneNb}</td>
                        <td>
                            <button
                                className="button button-primary"
                                onClick={() => handleEdit(client.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="button button-danger"
                                onClick={() => handleRemove(client.id)}
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

export default ClientList;
