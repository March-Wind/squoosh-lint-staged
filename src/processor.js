#!/usr/bin/env node
const shell = require('shelljs');
const processor = (image, outputDir) => {
    console.log('outputDir:' + outputDir);

    if (!/\.(png|jpg|webp)$/.test(image)) {
        console.log('ignore: ' + image);
        return Promise.reject();
    }
    const imageInCatalogArr = image.match(/(.*\/)(?:.*\.(?:png|jpg|webp))/);
    const imageInCatalog = imageInCatalogArr && imageInCatalogArr[1] ? imageInCatalogArr[1] : '';
    console.log('imageInCatalog:' + imageInCatalog);

    if (!imageInCatalog) {
        return Promise.reject(`${image}： not know parent directory`);
    }
    outputDir = outputDir ? outputDir : imageInCatalog;
    return new Promise((resolve, reject) => {
        let command = '';
        if (/\.jpg$/.test(image)) {
            command = `squoosh-cli --mozjpeg {quality:75} -d ${outputDir} ${image}`
        }
        if (/\.png$/.test(image)) {
            command = `squoosh-cli --oxipng auto --quant {enabled:true} -d ${outputDir} ${image}`;
        }
        if (/\.webp$/.test(image)) {
            command = `squoosh-cli --webp {quality:60} -d ${outputDir} ${image}`;
        }
        if (!command) {
            console.log('ignore: ' + image);
            return Promise.reject();
        }

        shell.exec(command, { shell: true }, (code, stdout, stderr) => {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            if (code === 0) {
                resolve();
            } else {
                reject();
            }
        });
    })
}

module.exports = processor;