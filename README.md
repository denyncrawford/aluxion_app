
# Aluxion project

This project is made with Vite, Vue3, TailwindCSS, Pinia and ExpressJS.

> Please, provide environment variables on deploy:

    * EMAIL (for emt)
    * PASSWORD (for emt)
    * VITE_API_URL (optional) (default: http://localhost:3000)
    * SERVICE_PORT (optional) (default: 3000)

## Build 

> Please note that service is built with deno if you don't have deno, you can just build vite (frontend) and deliver the service as raw (Node or Deno).
> Prebuilt binaries are given as a release for using it on any platform without dependencies.

```bash
yarn build:vite
yarn build:service
or
yarn build
```

## Deploy

    * Make sure the API_URL is correct.
    * Deploy site to netlify or any other static site hosting.
    * Deliver the microservice to heroku or any other PaaS.

## Run locally

```bash
yarn run dev:vite
yarn run dev:service
or
yarn dev
```
