## squoosh-lint-staged
> designed for lint-staged usage with sensible defaults

## Installation
```
npm i --save-dev squoosh-lint-staged
```

## Usage
```
"lint-staged": {
    "*.{png,jpg,webp}": ["imagemin-lint-staged", "git add"]
}
```
> Other formats are not supported at the moment（gif）,Please change JPEG to jpg 

## Other
> use node v10.5.0 or above。
