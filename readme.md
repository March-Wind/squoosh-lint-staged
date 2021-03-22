## squoosh-lint-staged
> designed for lint-staged usage with sensible defaults，but CLI calls are also supported.

### introduce
Automatically optimize images on submission

## Installation
```
npm i --save-dev squoosh-lint-staged
```

## Usage
1. ```squoosh-lint-staged 1.png 2.png```, Replacement of original position
2. ```squoosh-lint-staged -T ./images ```, Replace the original location in the folder
3. ```squoosh-lint-staged -T ./images -O ./newImages/```, Output to new directory
4. ```squoosh-lint-staged -O ./newImages/ 1.png 2.png```, Output to new directory
5. use width lint-staged
```
"lint-staged": {
    "*.{png,jpg,webp}": ["squoosh-lint-staged", "git add"]
}
```
> Other formats are not supported at the moment（gif）,Please change JPEG to jpg 

## Other
> use node v10.5.0 or above。
