import React, {useEffect, useState} from 'react';
import axios from "axios";

function CompaniesTable(props) {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('/api/companies');
            setCompanies(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div></div>
    );
}

export default CompaniesTable;
