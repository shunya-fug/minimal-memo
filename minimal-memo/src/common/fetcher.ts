import { ApiErrorResponse } from "@/types/response";
import { ApiError } from "next/dist/server/api-utils";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseJson = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, (responseJson as ApiErrorResponse).message);
  }

  return responseJson;
};
