const fs = require('fs');
const glob = require('glob');
const {isString, formatURL} = require('./tool');

const collectPictures = (path, isDir) => {
    if(isDir){
        return glob.sync(formatURL(`${path}/**.*(jpg|png|webp)`));
    }else{
        if(/\.(jpg|png|webp|)$/){
            return [path];
        }
    }
}
const processingDir = (path, outputDir, isDir) => {
    if(isDir){
        shell.exec(`cp -R ${formatURL(path + '/*')} ${outputDir}`);
    }else{
        if(/\.(jpg|png|webp|)$/){
            return;
        }
        shell.exec(`cp ${path} ${outputDir}`);
    }
}
/**
 * 接受目录路径，多个路径(文件或文件夹混合)
 */
const separate = (targets,outputDir, positive) => {
    if(!targets){
        return;
    }
    let dirArray = targets;

    if(isString(targets)){
        dirArray = [targets];
    }
    let images = [];
    targets.forEach(item => {
        const state = fs.lstatSync(item);
        const isDir = state.isDirectory();
        // 处理图片
        const img = collectPictures(item, isDir);
        if(img){
            images = [].concat([], img);
        }
        // 处理文件夹
        if(outputDir && positive){
            processingDir(item, outputDir, isDir)
        }
    });
    return images;
}
module.exports = separate;