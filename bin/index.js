#!/usr/bin/env node
const argv = require('argv');
const glob = require('glob');
const processor = require('../src/processor');
const formatURL = require('../src/formatURL')
argv.option({
    name: 'targetDir',
    short: 'T',
    type: 'string',
})
.option({
    name: 'outputDir',
    short: 'O',
    type: 'string',
});
const args = argv.run(process.argv.slice(2))
const { targets, options } = args;
const { targetDir, outputDir } = options;
let pendingProcessor = null;
let images = null;
if (targets && !targetDir && !outputDir) { // 优化完完替换自身
    pendingProcessor = (image) => processor(image, '');;
    images = targets;
}
if (targets && outputDir) { //优化完输出到新的目录
    pendingProcessor = (image) => processor(image, outputDir);
    images = targets;
}
if (targetDir && outputDir) { // 处理文件夹中的图片，优化完输出到新目录
    pendingProcessor = (image) => processor(image, outputDir)
    images = glob.sync(formatURL(`${targetDir}/**.*(jpg|png|webp)`));
}
if (targetDir && !outputDir) { // 处理文件夹中的图片，优化完替换自身
    pendingProcessor = (image) => processor(image, '');;
    images = glob.sync(formatURL(`${targetDir}/**.*(jpg|png|webp)`));
}
if (!pendingProcessor || !images) {
    console.error('No effective processor found, maybe it is a matter of parameters');
    process.exit(1);
}
Promise.all(images.map(pendingProcessor)).catch(function (e) {
    console.error(e);
    process.exit(1);
});