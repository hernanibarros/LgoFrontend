// src/services/DepartmentService.js
import axios from 'axios';

const DepartmentService = {
    findAll: async () => {
        const backendUrl = 'http://localhost:8080';  
        const response = await axios.get(`${backendUrl}/api/departments`);  
        return response.data;
    }
};

export default DepartmentService;
