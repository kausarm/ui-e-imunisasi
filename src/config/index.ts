import axios, { Method } from "axios";

interface CallAPIParams {
  url: string;
  method: Method;
  data?: any;
}

interface CallAPIResponse {
  error: boolean;
  message: string;
  data: any;
}

export default async function callAPI({
  url,
  method,
  data,
}: CallAPIParams): Promise<CallAPIResponse> {
  try {
    const response = await axios({
      url,
      method,
      data,
    });

    const responseData = response?.data?.data || response?.data;

    return {
      error: false,
      message: "Success",
      data: responseData,
    };
  } catch (error:any) {
    const errorMessage = error?.response?.data?.message || "Error";

    return {
      error: true,
      message: errorMessage,
      data: null,
    };
  }
}
