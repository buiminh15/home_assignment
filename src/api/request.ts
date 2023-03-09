import axios from "axios";

const BASE_URL = "https://api.supermomos-dev.com/interview/social";

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

const createAccount = (payload: AccountPayload) =>
  axios.post(BASE_URL, payload, headers);
export { createAccount };
