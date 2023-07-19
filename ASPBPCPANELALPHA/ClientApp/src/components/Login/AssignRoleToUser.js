import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignRolesToUser() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/Users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleRoleChange = (event) => {
        const { value, checked } = event.target;
        setSelectedRoles((prevRoles) => {
            if (checked) {
                return [...prevRoles, value];
            } else {
                return prevRoles.filter((role) => role !== value);
            }
        });
    };

    const assignRoles = async () => {
        try {
            await axios.post(`/api/Users/${selectedUser}/roles`, selectedRoles);
            console.log('Roles assigned successfully');
        } catch (error) {
            console.error('Error assigning roles:', error);
        }
    };

    return (
        <div>
            <h3>Assign Roles to User</h3>
            <div>
                <label>
                    Select User:
                    <select value={selectedUser} onChange={handleUserChange}>
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.userName}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {selectedUser && (
                <div>
                    <h4>Selected User: {selectedUser}</h4>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="Admin"
                                checked={selectedRoles.includes('Admin')}
                                onChange={handleRoleChange}
                            />
                            Admin
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                value="LimitedRole"
                                checked={selectedRoles.includes('LimitedRole')}
                                onChange={handleRoleChange}
                            />
                            LimitedRole
                        </label>
                    </div>
                    <button onClick={assignRoles}>Assign Roles</button>
                </div>
            )}
        </div>
    );
}

export default AssignRolesToUser;
