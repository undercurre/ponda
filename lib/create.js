const path = require('path')
const fs = require('fs-extra');
const middleware = require('../utils/logo');
const Generator = require('../utils/generator');

module.exports = async function (name, options) {
  // 执行中间件
  middleware(async() => {
    // 当前命令行选择的目录
    const cwd  = process.cwd();
    // 需要创建的目录地址
    const targetAir  = path.join(cwd, name)

    // 目录是否已经存在？
    if (fs.existsSync(targetAir)) {

      // 是否为强制创建？
      if (options.force) {
        await fs.remove(targetAir)
      } else {
        // TODO：询问用户是否确定要覆盖
      }
    }

    // 创建项目
    const generator = new Generator(name, targetAir);

    // 开始创建项目
    generator.create()
  })
}