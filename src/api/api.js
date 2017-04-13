import axios from 'axios';
import querystring from 'querystring';
let base = '/management';

// Add a response interceptor
var checkLoginInterceptor = axios.interceptors.response.use(function (res) {
    // if(res.data.resCode == 2){
    //   Vue.$router.push({ path: '/login' });
    //   return;
    // }
    console.log(res);
    return res;
  }, function (error) {
    console.log(error);
    return Promise.reject(error);
  });

export const getUserList = params => { return axios.get(`${base}/power/querySysUserList`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const updateUserStateToFreezeApi = (params) => {
  return axios({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'post',
    url: `${base}/power/freezeSysUser`,
    data: querystring.stringify(params)
  });
};

export const updateUserStateToUnfreezeApi = (params) => {
  return axios({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'post',
    url: `${base}/power/freezeSysUser`,
    data: querystring.stringify(params)
  });
};

export const editUserApi = params => {
  return axios.post(`${base}/power/updateUserRole`, {
    params: params
   });
 };

export const getRolesApi = () => {
  return axios({
    method: 'get',
    url: `${base}/power/queryRoleList`
  });
};

export const requestLogin = params => {
  return axios({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'post',
    url: `${base}/sys/login`,
    data: querystring.stringify(params)
  })
  .then(res => res.data);
};
