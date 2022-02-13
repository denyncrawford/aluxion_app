import express, { json } from "express";
import axios from "axios";
import { config } from "dotenv";

config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const baseUrl = "https://openapi.emtmadrid.es";
const loginUrl = `${baseUrl}/v1/mobilitylabs/user/login`;
const token = {
  accessToken: "",
  expirationDate: new Date().getTime(),
};

const app = express();
app.use(json());
app.set('json spaces', 2)

// Login method

const login = async () => {
  if (token.accessToken.length && token.expirationDate < new Date().getTime()) return;
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

app.use("/api", async (req, res) => {
  const { url, method } = req;
  const { accessToken } = token;
  try {
    await login();
    const { data } = await axios({
      method,
      url: `${baseUrl}${url}`,
      headers: {
        accessToken,
      },
      data: req.body || undefined,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log("Micro Service listening on port 3001"));
