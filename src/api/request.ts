import { AccountPayload } from "@/types/AccountType";
import axios, { AxiosResponse } from "axios";

const APIGateway = axios.create({
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
  return await APIGateway.post(`${path}`, payload);
};

export { createAccount };
