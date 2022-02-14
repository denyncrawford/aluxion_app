import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { opineCors as cors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import axios from "https://deno.land/x/axiod@0.20.0-0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const email = Deno.env.get("EMAIL");
const password = Deno.env.get("PASSWORD");
const port = Number(Deno.env.get("SERVICE_PORT")) || 3000;
const baseUrl = "https://openapi.emtmadrid.es";
const loginUrl = `${baseUrl}/v1/mobilitylabs/user/login`;

const token = {
  accessToken: "",
  expirationDate: new Date().getTime(),
};

const app = new Application();
app.use(oakCors(
  {
    origin: "*",
  },
));

// Login method

const login = async () => {
  if (token.accessToken.length && token.expirationDate < new Date().getTime()) {
    return;
  }
  const { data: { data } } = await axios({
    method: "get",
    url: loginUrl,
    withCredentials: false,
    headers: {
      email,
      password,
    },
  });
  console.log(data);
  token.accessToken = data[0].accessToken;
};

// Main router

app.use(async (ctx) => {
  const { method, body, url: { pathname, search } } = ctx.request;
  const url = pathname + search;
  const { accessToken } = token;
  if (!url.startsWith("/api")) {
    return ctx.response.body = `cannot ${method} ${url}`;
  }
  try {
    await login();
    const { data } = await axios({
      method,
      url: `${baseUrl}${url}`,
      headers: {
        accessToken,
      },
      data: body || undefined,
    });
    ctx.response.body = data;
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.response.body = error;
  }
});

app.listen({ port });

console.log(`Micro Service listening on port ${port}!`);
