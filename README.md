# 📞 iChat

iChat is a real time chat application that supports private chats

# Documentation

The documentation for iChat can be viewed [here](iamkhattar.github.io/iChat)

# Installation

## Setup

Create a file called _keys.js_ under _/config_. Export a MongoURI and a Secret token for JWT Encryption from this file.

The _keys.js_ file should look like this:

```javascript
module.exports = {
  mongoURI: "mongo-uri-goes-here",
  secrettoken: "secret-token-goes-here",
};
```

## Installing Server Dependencies

The server requires additional dependencies to be installed on the system to function as intended. To install these dependencies, use the following command in the root directory

```bash
  npm install
```

## Installing Client Dependencies

The client requires additional dependencies to be installed on the system to function as intended. To install these dependencies, use the following command in the client directory.
To navigate to the client directory use the following command:

```bash
  cd client
```

Once in the client directory, use the following command to install the required dependencies:

```bash
  npm install
```

# Running the Application

To run the application in developer mode, use the following command:

```bash
  npm run dev
```

The application will refresh automatically if any changes are made to the code in Devloper Mode

# Technology Stack

## Client

<img src="./assets/common/html.png" width="80" height="80" title="HTML"> <img src="./assets/common/css.png" width="80" height="80" title="CSS"> <img src="./assets/common/javascript.png" width="80" height="80" title="JavaScript"> <img src="./assets/common/react.png" width="80" height="80" title="React"> <img src="./assets/common/socketio.png" width="80" height="80" title="Socket.io">

## Server

<img src="./assets/common/nodejs.png" width="80" height="80" title="Node.js"> <img src="./assets/common/express.png" width="80" height="80" title="Express.js"> <img src="./assets/common/mongodb.png" width="80" height="80" title="MongoDB"> <img src="./assets/common/socketio.png" width="80" height="80" title="Socket.io">

## Development

<img src="./assets/common/vscode.png" width="80" height="80" title="Visual Studio Code"> <img src="./assets/common/git.png" width="80" height="80" title="Git"> <img src="./assets/common/github.png" width="80" height="80" title="Github">

# Application

| ![Login Page](_media/login.jpg) | ![Chat Page](_media/app.jpg) | ![Register Page](_media/register.jpg) |
| ------------------------------- | :--------------------------: | ------------------------------------: |


# Contributors

<a href="https://github.com/iamkhattar"><img src="https://avatars3.githubusercontent.com/u/56852615?s=400&u=656d6befdb16f2be60c9c1f80456509a9dde69c4&v=4" title="iamkhattar" width="80" height="80"></a> <a href="https://github.com/kalqallaf"><img src="https://avatars0.githubusercontent.com/u/34354484?s=460&u=afae2a1029190dadb9a61b4eb7444710a1b4ee3d&v=4" title="kalqallaf" width="80" height="80"></a>

# License

MIT
