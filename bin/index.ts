#! /usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import pkg from "./../package.json";
import checkDir from "./utils/checkDir";
import inquirer from "inquirer";
import path from "path";
import { exec, execSync } from "child_process";
import template from "./config/template";
import fs from "fs";
const program = new Command();

program.arguments("[command]").action((command) => {
  if (command === void 0) {
    console.log(
      "\r\n" +
        chalk.white.bgBlueBright.bold(
          figlet.textSync("PONDA", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
          })
        )
    );
    console.log(
      `\r\nRun ${chalk.cyan(
        `pd --help`
      )} for detailed usage of given command\r\n`
    );
  }

  if (!command) {
    console.log('Please enter a valid command. Use "help" for command list.');
  } else {
    console.log(`Unknown command: ${command}`);
  }
});

program
  .command("init <projectName>")
  .alias("i")
  .description("输入项目名称，初始化项目模版")
  .action(async (projectName, cmd) => {
    await checkDir(path.join(process.cwd(), projectName), projectName); // 检测创建项目文件夹是否存在
    inquirer.prompt(template.promptTypeList).then((result) => {
      const { url, gitName, branch, val } = result.type;
      console.log("您选择的模版类型信息如下：" + val);
      console.log("项目初始化拷贝获取中...");
      if (!url) {
        console.log(chalk.red(`${val} 该类型暂不支持...`));
        process.exit(1);
      }
      console.log(`git clone -b ${branch} ${url}`);
      exec(`git clone -b ${branch} ${url}`, function (error, stdout, stderr) {
        if (error !== null) {
          console.log(chalk.red(`clone fail,${error}`));
          return;
        }
        fs.rename(gitName, projectName, (err) => {
          if (err) {
            exec("rm -rf " + gitName, function (err, out) {});
            console.log(
              chalk.red(`The ${projectName} project template already exist`)
            );
          } else {
            try {
              // 进入当前项目文件夹，并在其中执行后续命令
              execSync(
                `cd ${projectName} && git remote rm origin && git branch -m master`,
                { stdio: "inherit" }
              );
              console.log("Optimization successful.");
            } catch (error) {
              console.error("An error occurred:", error);
            }
            console.log(
              chalk.green(
                `The ${projectName} project template successfully create(项目模版创建成功)`
              )
            );
          }
        });
      });
    });
  });

program
  // 配置版本号信息
  .version(`v${pkg.version}`, "-v, --version", "output the current version");

program.parse(process.argv);
