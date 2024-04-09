import API_ENUM from "../enum/API_ENUM";
import ApiEnumToParams from "../converter/ApiEnumToParams";
import AppAlert, { AlertTypeEnum } from "./alertUtils";

const apiCall = async (API_ENUM: API_ENUM, body?: any, query?: string) => {
  const params = ApiEnumToParams(API_ENUM);

  try {
    if (params?.url) {
      const url = params.url + (query ? query : "");
      const response = await fetch(url, {
        method: params.method,
        headers: params.header,
        credentials: params.credentials,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        try {
          const responseData = await response.json();
          if (responseData?.message?.length > 0)
            AppAlert(AlertTypeEnum.SUCCESS, responseData?.message);

          return {
            data: responseData.data,
            success: true,
          };
        } catch (jsonError) {
          return handleError();
        }
      } else {
        try {
          const data = await response.json();
          if (data?.message && data.message.length > 0)
            AppAlert(AlertTypeEnum.ERROR, data?.message);

          return {
            data: data.data,
            success: false,
          };
        } catch (jsonError) {
          return handleError();
        }
      }
    }
  } catch (err) {
    return handleError();
  }
};

const handleError = () => {
  return {
    data: null,
    success: false,
  };
};

export default apiCall;
