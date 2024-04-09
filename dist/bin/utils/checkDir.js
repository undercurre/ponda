"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
function checkDir(url, name) {
    let isExists = fs_1.default.existsSync(url);
    if (isExists) {
        console.log(chalk_1.default.red(`The ${name} project already exists in  directory. Please try to use another projectName`));
        process.exit(1);
    }
}
exports.default = checkDir;
