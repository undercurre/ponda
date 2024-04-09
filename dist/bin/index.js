#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("./../package.json"));
const checkDir_1 = __importDefault(require("./utils/checkDir"));
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const template_1 = __importDefault(require("./config/template"));
const fs_1 = __importDefault(require("fs"));
const program = new commander_1.Command();
program.arguments("[command]").action((command) => {
    if (command === void 0) {
        console.log("\r\n" +
            chalk_1.default.white.bgBlueBright.bold(figlet_1.default.textSync("PONDA", {
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 80,
                whitespaceBreak: true,
            })));
        console.log(`\r\nRun ${chalk_1.default.cyan(`pd --help`)} for detailed usage of given command\r\n`);
    }
    if (!command) {
        console.log('Please enter a valid command. Use "help" for command list.');
    }
    else {
        console.log(`Unknown command: ${command}`);
    }
});
program
    .command("init <projectName>")
    .alias("i")
    .description("输入项目名称，初始化项目模版")
    .action((projectName, cmd) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, checkDir_1.default)(path_1.default.join(process.cwd(), projectName), projectName); // 检测创建项目文件夹是否存在
    inquirer_1.default.prompt(template_1.default.promptTypeList).then((result) => {
        const { url, gitName, branch, val } = result.type;
        console.log("您选择的模版类型信息如下：" + val);
        console.log("项目初始化拷贝获取中...");
        if (!url) {
            console.log(chalk_1.default.red(`${val} 该类型暂不支持...`));
            process.exit(1);
        }
        console.log(`git clone -b ${branch} ${url}`);
        (0, child_process_1.exec)(`git clone -b ${branch} ${url}`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log(chalk_1.default.red(`clone fail,${error}`));
                return;
            }
            fs_1.default.rename(gitName, projectName, (err) => {
                if (err) {
                    (0, child_process_1.exec)("rm -rf " + gitName, function (err, out) { });
                    console.log(chalk_1.default.red(`The ${projectName} project template already exist`));
                }
                else {
                    try {
                        // 进入当前项目文件夹，并在其中执行后续命令
                        (0, child_process_1.execSync)(`cd ${projectName} && git remote rm origin && git branch -m master`, { stdio: "inherit" });
                        console.log("Optimization successful.");
                    }
                    catch (error) {
                        console.error("An error occurred:", error);
                    }
                    console.log(chalk_1.default.green(`The ${projectName} project template successfully create(项目模版创建成功)`));
                }
            });
        });
    });
}));
program
    // 配置版本号信息
    .version(`v${package_json_1.default.version}`, "-v, --version", "output the current version");
program.parse(process.argv);
