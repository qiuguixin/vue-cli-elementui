import axios from 'axios';
import querystring from 'querystring';
let base = '/management';

//export const requestLogin = params => { return axios.post(`${base}/sys/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/power/querySysUserList`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const requestLogin = params => {
  return axios({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'post',
    url: `${base}/sys/login`,
    data: querystring.stringify(params)
  })
  .then(res => res.data);
};
