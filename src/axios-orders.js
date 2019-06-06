import axios from "axios";

export default axios.create({
  baseURL: 'https://react-burger-1-1.firebaseio.com/'
});