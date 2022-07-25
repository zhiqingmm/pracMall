import axios from "axios";
// import store from '../store/index'
//创建axios实例
const instance = axios.create({
    baseURL: "http://59.110.26.152:9292",
    timeout: 5000,
    headers: {
        contentType: "application/json;charset=UTF-8",
    },
});
export default { instance };