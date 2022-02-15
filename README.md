
# Aluxion project

This project is made with Vite, Vue3, TailwindCSS, Pinia and ExpressJS.

> Please, provide environment variables on deploy:

    * EMAIL (for emt)
    * PASSWORD (for emt)
    * VITE_API_URL (optional) (default: http://localhost:3000)
    * SERVICE_PORT (optional) (default: 3000)

## Build 

> Please note that service is built with deno if you don't have deno, you can just build vite (frontend) and deliver the service as raw (Node or Deno).
> Anyway, prebuilt binaries are provided as a release [here](https://github.com/denyncrawford/aluxion_app/releases/tag/0.2.0) for using the backend on any platform without dependencies or runtimes.

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
## Run the service with Deno instead of Node (optional)

```bash
deno run -A https://raw.githubusercontent.com/denyncrawford/aluxion_app/main/microservices/denoProxyPass.ts
```
