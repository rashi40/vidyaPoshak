![Screenshot from 2020-10-13 11-27-38](https://user-images.githubusercontent.com/48552022/95821454-90510500-0d47-11eb-9703-64fb7481d9fa.png)

# VidyaPoshak

This project aims at building a complete web app for the Non-Profit Organization VidyaPoshak.

VidyaPoshak is a not-for-profit organization founded to provide the edducation to every children of unprivileged sections of the society. They invest in a Young, economically challenged meritorious youth for a few years,to break the poverty cycle of a family forever. Their is a significant need of volunteers and donors  which is what called for this project, as an attempt to help the Non-Profit Organization.

The application consists of the following components:

- HTML/Css is used in creating the frontend
- Node.js accessing services provided by a RESTful API
- RESTful API, running as a Node.js Express application


##Development Setup

- Pre-requisites to be installed - `node`, `npm`, `mongodb`

- Execute the following to setup the directory :-

```
git clone https://github.com/rashi40/vidyaPoshak
cd vidyaPoshak
npm install

```
- Include the MongoDB username, password and other details in `.env` file in the root directory in the following form :-

```
DB_PORT=<port number>
DB_USERNAME=<username>
DB_PASSWORD=<password>

```

- Run ` npm start ` to start the server at the specified port.

## You can see the web app working here : [VidyaPoshak](https://vidyaposhak.herokuapp.com).
