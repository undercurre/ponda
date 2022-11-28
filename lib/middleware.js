const figlet = require('figlet')

module.exports = function middleware(callback) {
    // 打印logo
    console.log('\r\n' + figlet.textSync('ponda', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      }));
    callback();
}