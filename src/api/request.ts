import { AccountPayload } from "@/types/AccountType";
import axios, { AxiosResponse } from "axios";

// const BASE_URL = process.env.BASE_URL;
const BASE_URL = "https://api.supermomos-dev.com/interview";

const APIGateway = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseInterceptor = (response: AxiosResponse<any>) => {
  return response.data;
};

APIGateway.interceptors.response.use(responseInterceptor);

const createAccount = async ({
  path,
  payload,
}: {
  path: string;
  payload: AccountPayload;
}) => {
  return await APIGateway.post(`${BASE_URL}${path}`, payload);
};

export { createAccount };
