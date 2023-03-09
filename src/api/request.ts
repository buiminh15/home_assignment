import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

const createAccount = (payload: AccountPayload) =>
  axios.post(BASE_URL as string, payload, headers);
export { createAccount };
