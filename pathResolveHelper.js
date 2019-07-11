const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const resolvePackage = packageName => {
    const pathToPackage = path.resolve(appDirectory, `./node_modules/`, packageName);

    try {
        fs.statSync(pathToPackage);
    } catch (e) {
        console.warn(chalk.gray.bgYellow(`${pathToPackage} not found. Used ${chalk.black(`@moedelo/webpack2-build modules`)}`)); // eslint-disable-line no-console
        return path.resolve(appDirectory, `./node_modules/@moedelo/webpack2-build/node_modules`, packageName);
    }

    return pathToPackage;
};

module.exports = { resolvePackage, resolveApp };
