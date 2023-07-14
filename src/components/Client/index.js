import React, { useState } from 'react';
import './client.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ClientList = () => {
    const [Client, setClient] = useState([
        {
            id: 1,
            ClientName: 'Myriam Ladhari',
            Email: 'Gigi',
            PhoneNb : 'huh',

        },
        {
            id: 2,
            ClientName: 'Sacha',
            Email: 'loli',
            PhoneNb : 'gui',
        },

        // Add more complaints as needed
    ]);

    const [modal, setModal] = useState(false);
    const [formValues, setFormValues] = useState({
        clientName: '',
        Email: '',
        PhoneNb: '',
    });

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission and add new complaint
        const newClient = {
            id: Client.length + 1,
        };
        setClient((prevClient) => [...prevClient, newClient]);
        setModal(false);
        setFormValues({
            clientName: '',
            Email: '',
            PhoneNb: '',
        });
    };

    const handleEdit = (id) => {
        console.log(`Editing Client with ID: ${id}`);
        // Add your edit logic here
    };


    const handleRemove = (id) => {
        // Create a new array without the complaint with the given id
        const updatedClient = Client.filter((Client) => Client.id !== id);

        // Update the data source with the updated array of complaints
        setClient(updatedClient);
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
            <h2>Client List</h2>
            <div className="add-button-container">
                <Button color="danger" onClick={toggle}>
                    ADD Client
                </Button>
                <Modal isOpen={modal} toggle={toggle}  className="modal-container">
                    <ModalHeader toggle={toggle} className="modal-header">
                        Add Client
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
                                    type="text"
                                    id="Email"
                                    name="Email"
                                    value={formValues.Email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="PhoneNb">PhoneNb :</label>
                                <input
                                    type="text"
                                    id="PhoneNb"
                                    name="PhoneNb"
                                    value={formValues.ClientType}
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


            <table className="Client-table">
                <thead>
                <tr>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>PhoneNb</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Client.map((Client) => (
                    <tr key={Client.id}>
                        <td>{Client.id}</td>
                        <td>{Client.ClientName}</td>
                        <td>{Client.Email}</td>
                        <td>{Client.PhoneNb}</td>
                        <td>
                            <button className="button button-primary" onClick={() => handleEdit(Client.id)}>Edit</button>
                            <button className="button button-danger" onClick={() => handleRemove(Client.id)}>Remove</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
