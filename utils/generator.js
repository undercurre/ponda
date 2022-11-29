// 模板创建器

const path = require('path');
const { getRepoList } = require('./github.js');
const inquirer = require('inquirer');
const config = require('../config.js');
const util = require('util');
const downloadGitRepo = require('download-git-repo');
const wrapLoading = require('./loading.js');

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 下载
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    // 筛选
    const needs = repoList.filter(item => config.support.includes(item.id))

    // 过滤我们需要的模板名称
    const repos = needs.map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    // 3）return 用户选择的名称
    return repo;
  }

  // 下载逻辑

  async download(repo){

    // 1）拼接下载地址
    const requestUrl = `undercurre/${repo}`;

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo();
    
    console.log('you chose，repo=' + repo);

    // 2）下载模板

    await this.download(repo);
  }
}

module.exports = Generator;