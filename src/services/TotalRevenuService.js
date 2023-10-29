// src/services/TotalRevenuService.js
import axios from 'axios';

const TotalRevenuService = {
    findByYear: async (year) => {
        const backendUrl = 'http://localhost:8080';  
        const response = await axios.get(`${backendUrl}/api/dailytotals/kabeca/${year}`);  
        return response.data;
    }
};

export default TotalRevenuService;
