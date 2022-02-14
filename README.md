
# Aluxion project

This site is made with VueJS and ExpressJS.

> Please, provide environment variables on deploy:

    * EMAIL (for emt)
    * PASSWORD (for emt)
    * API_URL (optional) (default: localhost:3001)
    * SERVICE_PORT (optional) (default: 3000)

## Build 

> Please note that service is built with deno if you don't have deno, you can just build vite and deliver the service as raw.
> Deno binaries is given as a release for using it on any platform without dependencies.

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
yarn dev
```