# Epic movie quotes

In epic movie quotes you can go through authorization with specific email or quickly authorize with google account. After authorization you are redirected to news feed page where you can see newest posts. You can update your credentials by going to profile page. You can also add movies and add quotes as posts which you can delete or modify however you want. You can also like and comment someone elses post and they will get your interaction to posts via notifications. This website has English and Georgian languages support.

#

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Resources](#resources)

## Prerequisites

- <img style="padding-right:10px;" align="left"  src="readme/assets/node-js.png"   height="22"/> <p>_Node JS @12.X and up_</p>
- <img style="padding-right:10px;" align="left"  src="readme/assets/npm.png"   height="15"/> <p>_npm @6 and up_</p>

#

## Tech Stack

- <img style="padding-right:10px;" align="left"  src="readme/assets/react.png"   height="25"/> <p><a href="https://legacy.reactjs.org/" target="_blank">[React.js @18.2.0]</a> - Javascript library<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/tailwind.png"   height="25"/> <p><a href="https://tailwindcss.com/" target="_blank">[tailwindcss @5.0.4]</a> - CSS framework<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/axios.png"   height="25"/> <p><a href="https://axios-http.com/" target="_blank">[axios @1.4.0]</a> - Promise based HTTP client for the browser and node.js<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/react-hook-form.png"   height="25"/> <p><a href="https://react-hook-form.com/" target="_blank">[React-hook-form @7.43.9]</a> - React hook form for making easy forms with react<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/date-fns.jpg"   height="25"/> <p><a href="https://date-fns.org/" target="_blank">[Date-fns @2.30.0]</a> - Working with dates made easier with date-fns<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/laravel-echo.png"   height="25"/> <p><a href="https://laravel.com/docs/10.x/broadcasting" target="_blank">[laravel-echo @1.15.1]</a> - Javascript library for subscribing to laravel events<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/next.png"   height="25"/> <p><a href="https://nextjs.org/" target="_blank">[Next.js @13.4.2]</a> - React framework which improves React<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/pusher.png"   height="25"/> <p><a href="https://pusher.com/" target="_blank">[Pusher-js @8.1.0]</a> - Powering realtime experiences for mobile and web<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/query.png"   height="25"/> <p><a href="https://tanstack.com/query/v3/" target="_blank">[React-query @3.39.3]</a> - Powerful asynchronous state management for TS/JS, React etc.<p/>

- <img style="padding-right:10px;" align="left"  src="https://fkhadra.github.io/react-toastify/img/favicon.ico"   height="25"/> <p><a href="https://fkhadra.github.io/react-toastify/introduction" target="_blank">[React-toastify @9.1.3]</a> - React-Toastify allows you to add notifications to your app with ease.<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/ts.png" height="25"/> <p><a href="https://www.typescriptlang.org/" target="_blank">[Typescript @5.0.4]</a> - TypeScript is JavaScript with syntax for types.<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/zod.png" height="25"/> <p><a href="https://zod.dev/" target="_blank">[Zod @3.21.4]</a> - TypeScript-first schema validation with static type inference.<p/>

#

## Getting Started

1\. First of all you need to clone repository from github:

```sh
git clone https://github.com/RedberryInternship/jarji-abulashvili-epic-movie-quotes-front.git
```

2\. Navigate to the repository

```sh
cd jarji-abulashvili-epic-movie-quotes-front/
```

3\. Next step requires install all the dependencies

```sh
npm install
```

or

```sh
yarn install
```

4\. copy .env

```sh
cp .env.example .env
```

5\. after that you can run application from terminal:

```sh
npm run dev
```

#

## Project Structure

```bash
├─── .github
├─── components
│    ├── icons
│    ├── Landing
│    ├── MovieList
│    ├── MovieShow
│    ├── Newsfeed
│    ├── Profile
│    ├── shared
│    └── index.ts
├─── context 
│     ├── AppContext.tsx
│     └── index.ts
├─── helpers
├─── hooks
│     ├── useUserUpdate.ts
│     └── index.ts
├─── pages
│     ├── _app.tsx
│     ├── index.tsx
│     ├── movie-list
│     │  ├── movieId
│     │  |   └── index.tsx
│     │  └── index.tsx
│     ├── newsfeed.tsx
│     ├── 403.tsx
│     ├── 404.tsx
│     └── profile.tsx
├─── public 
│     ├── assets
│     └── locales
│         ├── en
│         └── ka
├─── readme 
│    └── assets
├─── schema
├─── services
├─── styles
├─── types
│- .env.local
│- .env.example
│- .eslintrc.json
│- .gitignore
│- .prettierrc.json
│- next-env.d.ts
│- next-i18next.config.js
│- next.config.js
│- package.json
│- postcss.config.js
│- README.md
│- tailwind.config.js
│- vite.config.js
│- tsconfig.json
│- tsconfig.tsbuildinfo


```

#

## Resources

- [Application Details](https://redberry.gitbook.io/assignment-iv-movie-quotes-1/)
- [Application Design Figma](https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?node-id=0%3A1)
- [Git commit rules](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
- [Drawsql](https://drawsql.app/teams/jarji-abuashvili/diagrams/epic-movie-quotes)
- [Hosted Website](https://epic-movie-quotes.jarjia.redberryinternship.ge/)

