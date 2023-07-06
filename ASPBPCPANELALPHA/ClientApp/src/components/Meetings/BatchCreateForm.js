import React, { useState } from 'react';
import axios from 'axios';

const BatchCreateForm = () => {
    const [formData, setFormData] = useState({
        companies: [],
        clients: [],
        meetingStatuses: [],
        meetings: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('/api/batchcreate', formData)
            .then((response) => {
                // Handle successful response
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Companies</h2>
                <textarea
                    name="companies"
                    value={formData.companies}
                    onChange={handleChange}
                    rows={5}
                    cols={50}
                />
            </div>
            <div>
                <h2>Clients</h2>
                <textarea
                    name="clients"
                    value={formData.clients}
                    onChange={handleChange}
                    rows={5}
                    cols={50}
                />
            </div>
            <div>
                <h2>Meeting Statuses</h2>
                <textarea
                    name="meetingStatuses"
                    value={formData.meetingStatuses}
                    onChange={handleChange}
                    rows={5}
                    cols={50}
                />
            </div>
            <div>
                <h2>Meetings</h2>
                <textarea
                    name="meetings"
                    value={formData.meetings}
                    onChange={handleChange}
                    rows={5}
                    cols={50}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BatchCreateForm;
