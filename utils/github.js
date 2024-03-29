// 通过 axios 处理请求
const axios = require('axios')

axios.interceptors.request.use(config => {
  return config;
})

axios.interceptors.response.use(res => {
  return res.data;
})


/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  const res = await axios.get('https://api.github.com/users/undercurre/repos')
  return res
}

module.exports = {
  getRepoList,
}