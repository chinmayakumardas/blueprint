// free all rights reserved
// This file is part of the Open Source project: testing purpose
import axios from 'axios';

const axiosInstance3 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:8080',
 
});
export default axiosInstance3;