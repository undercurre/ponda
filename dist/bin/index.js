#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("./../package.json"));
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
    // 配置版本号信息
    .version(`v${package_json_1.default.version}`, "-v, --version", "output the current version");
program.parse();
