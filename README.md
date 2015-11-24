# sass-dev-server

is a dev server that compile your sass files on demand, no watcher, no configuration required.

> Note: For development only, do not use in production!

## Features

- Optional configuration
- Compile sass insanely fast on demand thanks to [node-sass](https://github.com/sass/node-sass)
- Enhanced version of `@import` directive:
    - Glob patterns, e.g `@import "components/*.scss"`
    - Include css files directly, e.g `@import "css:components/box.css"`
    - Auto resolve npm packages, e.g `@import "npm:bourbon/app/assets/stylesheets/_bourbon.scss";`
- Easy integration with other `express` app and build tools

## Installation

```
npm install -g sass-dev-server
```

## Usage

```
Usage: sass-dev-server [options]

Options:

  -h, --help         output usage information
  -V, --version      output the version number
  -p, --port [port]  port number that server listen to
  -r, --root [root]  server's root directory
```

#### Example

Providing this is your project folder structure

```
myproject
├── assets
|   └── styles
|       └── main.scss
```

- Run `sass-dev-server` inside `myproject`

```
$ myproject> sass-dev-server

> Running sass-dev-server at http://localhost:90000 with root set to "./"
```

- Add this to your HTML, and you are good to go!
```
<link rel="stylesheet" type="text/css" href="http://localhost:9000/assets/styles/main.scss">
```

Additionally, you can add an optional `--root` argument
```
$ myproject> sass-dev-server --root=assets/

> Running sass-dev-server at http://localhost:90000 with root set to "assets/"
```

That would make the server root to be at `myproject/assets`, thus your stylesheet path is shorten (without `assets/`)
```
<link rel="stylesheet" type="text/css" href="http://localhost:9000/styles/main.scss">
```

## Integration

#### Express app
```js
var Compiler = require('sass-dev-server').Compiler,
    Server = require('sass-dev-server').Server,
    express = require('express');

// create / setup your own express app
var app = express();

...

// integrate sass-dev-server with your express app
var compiler = new Compiler();
var server = new Server(compiler);
server.use(app);

...

app.listen(3000);
```

#### Render out to a file, useful for build tools
```js
var render = require('sass-dev-server').render;

// path is relative to `process.cwd()`, and server root
var file = 'assets/styles/main.scss';
var out = 'assets/compiled/main.css';

render(file, out).then(function(path) {
    console.log('rendered to %s', path);
});
```

## Configuration

If you want to customise how server is running and / or how `sass` files are compiled, create a `sass-dev-server.config.js` in the same folder where you are running `sass-dev-server`

```js
// sass-dev-server.config.js
module.exports = {
    server: {
        root: "assets/"
        port: 10000,
        headers: {
            ...
        }
    },

    compiler: {
        // all node-sass options
        ...
    }
}
```

## Importer

`sass-dev-server` comes with a flexible custom importer, there are a few things you can do

- Glob importing
```
@import "components/*.scss"
```

- Import css files directly using `css:` prefix
```
@import "css:components/box.css"
```

- Import node modules using `npm:` prefix
```
@import "npm:bourbon/app/assets/stylesheets/_bourbon.scss";
```


## Caveats
- For development use only
- Use your network IP address or `.local` domain if you are on Mac instead of `localhost`, that will ensure that your stylesheet still working when other machines are viewing the site
- The server does nothing with path resolution inside your stylesheet, so make sure if your define `--root` parameter, take into account of other things that being referenced inside the stylesheet file, e.g images, fonts

## License
[MIT](http://www.opensource.org/licenses/mit-license.php)