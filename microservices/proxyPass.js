import express, { json } from "express";
import axios from "axios";
import { config } from "dotenv";

config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const baseUrl = "https://openapi.emtmadrid.es/v1";
const loginUrl = `${baseUrl}/mobilitylabs/user/login`;
const token = {
  accessToken: "",
  expirationDate: new Date().getTime(),
};

const app = express();
app.use(json());

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
  const { url } = req;
  const { accessToken } = token;
  try {
    await login();
    const { data } = await axios({
      method: "get",
      url: `${baseUrl}${url}`,
      headers: {
        accessToken,
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log("Listening on port 3001"));
