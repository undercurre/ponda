import fs from "fs";
import chalk from "chalk";
import path from "path";

export default function checkDir(url: string, name: string) {
  let isExists = fs.existsSync(url);
  if (isExists) {
    console.log(
      chalk.red(
        `The ${name} project already exists in  directory. Please try to use another projectName`
      )
    );
    process.exit(1);
  }
}
