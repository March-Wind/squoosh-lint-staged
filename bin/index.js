#!/usr/bin/env node
const shell = require('shelljs');
const processor = (image) => {
    if (/\.(png|jpg|webp)$/.test(image)) {
        return Promise.resolve();
    }
    const imageInCatalogArr = image.match(/(.*\/)(?:.*\.(?:png|jpg|webp))/);
    const imageInCatalog = imageInCatalogArr && imageInCatalogArr[1] ? imageInCatalogArr[1] : '';
    if (!imageInCatalog) {
        return Promise.reject(`${image}： not know parent directory`);
    }
    return new Promise((resolve) => {
        let shell = '';
        if (/\.jpg$/.test(image)) {
            shell = `squoosh-cli --mozjpeg {quality:75} -d ./img ${image}`
        }
        if (/\.png$/.test(image)) {
            shell = `squoosh-cli --oxipng auto --quant {enabled:true} -d ./img ${image}`;
        }
        if (/\.webp$/.test(image)) {
            shell.exec(`squoosh-cli --webp {quality:60} -d ./img ${image}`);
        }
        if (shell) {
            return Promise.resolve();
        }
        shell.exec(shell, { shell: true }, (code, stdout, stderr) => {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            resolve();
        });
    })
}

Promise.all(process.argv.slice(2).map(processor)).catch(function (e) {
    console.error(e);
    process.exit(1);
});