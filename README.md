# :memo: Amb-Notes

[**:earth_africa: View Demo**](https://amb-notes.herokuapp.com)

Public Notes Sharing Web Application.

<!-- ![amb-notes-screenshot](/screenshot.gif?raw=true "Screenshot of the app") -->

## :book: Table of contents

<!-- toc -->

- [:scroll: Introduction](#scroll-introduction)
- [:checkered_flag: Getting started](#checkered_flag-getting-started)
- [:arrow_forward: Deployment](#arrow_forward-deployment)
- [:octocat: Technologies](#octocat-technologies)
  - [:computer: Frontend](#computer-frontend)
  - [:crystal_ball: Backend](#crystal_ball-backend)
- [:triangular_ruler: Design](#triangular_ruler-design)

<!-- tocstop -->

## :scroll: Introduction

This is a simple **Web application** that allows users to **post public notes** that others can see on the home page. <br>
It is mainly built with **VueJS** and **ExpressJS**. It implements many **common features** using many **libraries**. <br>
This project can be used for **learning purposes** or as a **starter template** for building similar applications.

## :checkered_flag: Getting started

1. Clone the repository:

```bash
cd somewhere
git clone https://github.com/Ambratolm/amb-notes.git
cd amb-notes
```

2. Install the dependencies:

```bash
npm i
```

3. Install [**Nodemon**](https://github.com/remy/nodemon/) globally:

```bash
npm i -g nodemon
```

4. Run app server:

```bash
npm run serve
```

4. Run api server:

```bash
npm run api
```

## :arrow_forward: Deployment

To deploy the project in a node environment:

1. Push the repository to a node server using a service like [Heroku](https://heroku.com).

2. Install the dependencies:

```bash
npm i
```

3. Build the app:

```bash
npm run build
```

7. Start the app:

```bash
npm start
```

You can also do the same to deploy locally.

## :octocat: Technologies

The initial project was generated using [**Vue CLI**](https://github.com/vuejs/vue-cli) tool.

### :computer: Frontend

This frontend app is mainly powered by Vue and its integrated packages:

| Library                                               | Use                          |
| :---------------------------------------------------- | :--------------------------- |
| [**VueJS**](https://github.com/vuejs/vue)             | Main JS framework            |
| [**Vue Router**](https://github.com/vuejs/vue-router) | Routing                      |
| [**Vuex**](https://github.com/vuejs/vuex)             | Centralized state management |

The **GUI** is powered by:

| Library                                                       | Use                 |
| :------------------------------------------------------------ | :------------------ |
| [**Bulma**](https://github.com/jgthms/bulma)                  | Main CSS framework  |
| [**Buefy**](https://github.com/buefy/buefy)                   | Bulma UI components |
| [**Bulmaswatch**](https://github.com/jenil/bulmaswatch)       | Bulma themes        |
| [**FontAwesome**](https://github.com/FortAwesome/FontAwesome) | Icons               |
| [**AnimateCSS**](https://github.com/daneden/animate.css)      | CSS animations      |

The frontend app is using these **utilities**:

| Library                                                            | Use                            |
| :----------------------------------------------------------------- | :----------------------------- |
| [**Axios**](https://github.com/axios/axios)                        | AJAX calls                     |
| [**Vue Meta**](https://github.com/nuxt/vue-meta)                   | HTML metadata                  |
| [**Moment**](https://github.com/moment/moment/)/                   | Dates format                   |
| [**Vue Moment**](https://github.com/brockpetrie/vue-moment)        | Moment pipes                   |
| [**VeeValidate**](https://github.com/logaretm/vee-validate)        | Form validation                |
| [**VuexPersist**](https://github.com/championswimmer/vuex-persist) | Data persistence               |
| [**Lodash**](https://github.com/lodash/lodash)                     | Common and array related tasks |

### :crystal_ball: Backend

The backend **API** and **Database** (_Using [file system](https://nodejs.org/api/fs.html) for the moment_) are powered by:

| Library                                             | Use                    |
| :-------------------------------------------------- | :--------------------- |
| [**Node**](https://github.com/nodejs/node)          | JS runtime             |
| [**Express**](https://github.com/expressjs/express) | Main Node JS framework |

The backend app is using these **utilities**:

| Library                                                                | Use                        |
| :--------------------------------------------------------------------- | :------------------------- |
| [**Lodash**](https://github.com/lodash/lodash)                         | Arrays data querying       |
| [**Joi**](https://github.com/hapijs/joi)                               | Data validation            |
| [**JsonWebToken**](https://github.com/auth0/node-jsonwebtoken)         | Authentication             |
| [**Uuid**](https://github.com/uuidjs/uuid)                             | IDs generation             |
| [**BcryptJS**](https://github.com/dcodeIO/bcrypt.js)                   | Password hashes generation |
| [**CommonErrors**](https://github.com/shutterstock/node-common-errors) | Errors classes             |
| [**Colors**](https://github.com/Marak/colors.js)                       | Console colorations        |
| [**Faker**](https://github.com/marak/Faker.js)                         | Mock test data generation  |

## :triangular_ruler: Design

- :paperclip: [Models](/docs/models.md)
- :paperclip: [Features](/docs/features.md)
- :paperclip: [ToDos](/docs/todos.md)
