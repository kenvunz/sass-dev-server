# sass-dev-server

is a server that compile your sass files on demand, no watchers, no configuration required.\

> Note: For development only, do not use in production!

## Features

- Optional configuration
- Compile sass insanely fast on demand thanks to (node-sass)[https://github.com/sass/node-sass]
- Support glob importing out of the box, e.g `@import "components/*.scss"`

## Installation

```
npm install -g sass-dev-server
```

## Usage

```
Usage: sass-dev-server <root directory> [options]

 Options:

   -h, --help     output usage information
   -V, --version  output the version number
   -p, --port     port number to run server on
```

#### Example

Providing this is your project folder structure

```
myproject
├── assets
|   └── styles
|       └── main.scss
```

1. Run `sass-dev-server ` on the `myproject` folder

```
$ myproject> sass-dev-server

> Running sass-dev-server at http://localhost:90000
```

2. Add this to your HTML
```
<link rel="stylesheet" type="text/css" href="http://localhost:9000/assets/styles/main.scss">
```