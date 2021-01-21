<p align="center">
<img height="180" align="absmiddle" src="https://user-images.githubusercontent.com/31903525/87408844-5e06fe80-c5c4-11ea-8b52-3d306cd332b2.png" alt="Logo of Koro-san">
</p>
<p align="center"><i>Give me all your fingers. Right now!</i></p>

# Koro-san

![David](https://img.shields.io/david/moka491/korosan?style=flat-square)![Codecov branch](https://img.shields.io/codecov/c/github/moka491/korosan/master?style=flat-square)![GitHub package.json version](https://img.shields.io/github/package-json/v/moka491/korosan?style=flat-square)![Node engine version](https://img.shields.io/badge/node-%3E%3D14.0.0-blue?style=flat-square)![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/moka491/korosan/discord.js?style=flat-square)

Koro-san is your helpful Discord bot with a whole bunch of features (wip™).  
It's a practice project for me to learn TypeScript, Jest, TOML and Node.

## Getting started

Starting up is simple!

The only requirement is to have Node.js 14 installed, you can get it [here](https://nodejs.org/en/download/current/).

Then, after cloning the project, copy the `config/config.example.toml` to `config/config.toml`,
and open it with your editor.  
Grab the Discord token of your bot application from [here](https://discord.com/developers/applications) (Select your app -> Bot Tab -> Token -> Copy),  
and paste it in the `token = "<your discord bot token>"` line.

Finally, open a terminal in the project folder and execute the following in order:

```bash
# Install the dependencies
npm install # (or yarn)

# Build and start for production use
npm run start # (yarn start)
```

And there you go!  
You can now invite the bot to any server of your choice and use it!  
If you need an invite link, go [here](https://discord.com/developers/applications) again, select your application,
click on the OAuth2 tab and click the `bot` checkbox in the `Scopes` block.

## Developing

To work on this project, follow the steps above.  
Instead of running a production environment with `npm run start`,
you can start a hot-reloading dev server by using:

```bash
npm run dev # Starts a hot-reloading dev server using ts-node and nodemon
```

Then, whenever you save changes in a `.ts` file, the bot will automatically restart.

### Building

While not needed in most cases, you can build the project using:

```bash
npm run build
```

You then find the output of that build in the `./dist` folder.

### Deploying / Publishing

Deploy the code on any environment you'd like, you only need Node >= v14 installed.  
Follow the steps of `Getting Started` and set up a new Discord application (since you don't want to use your dev application token), create the config file just like above, and run the following two commands:

```bash
npm install
npm run start # Builds and starts the project in production mode
```

## Contributing

Contributions are always welcome!  
If you'd like to contribute, please fork the repository and use a feature branch.  
Then create a pull request once ready ;)

Tests are written with [jest](https://jestjs.io/).  
If you don't know jest, don't hesitate to create a pull request anyway, I'll help out getting your code tested as needed!

If you do, please write unit-tests for every class/function file you create,
inside adjacent files called `<original file>.test.ts`.  
You can always run them using `npm test`.

## Licensing

The code in this project is licensed under MIT license.

- - -

_readme template gladly taken from [jehna/readme-best-practices](https://github.com/jehna/readme-best-practices)_
