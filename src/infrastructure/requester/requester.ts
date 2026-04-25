import { PATH_ROUTER } from "../../presentation/configuration";
import { useAuthStore } from "../../store/auth.store";
import { api } from "../queries/config";
import { HttpStatus } from "./HttpStatus";

type RequestOptions = {
  returnUrl?: string;
  contentType?: string;
};
const emptyRequestBody = JSON.stringify(true);

function createHeaders(options?: RequestOptions) {
    return {
        'X-CSRF': '1',
        Accept: 'application/json',
        Pragma: 'no-cache',
        'Content-Type': options?.contentType ?? 'application/json',
    };
}

async function refreshAccessToken() {
  const res = await fetch(
    `${import.meta.env.VITE_BACK_END_API_URL}/api/Auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.accessToken;
}

async function fetchCustom<TResponse>(url: string, init: RequestInit, options?: RequestOptions) {

  const token = useAuthStore.getState().accessToken;
  const config = {
    ...init,
    headers: {
      ...init.headers,
      ...createHeaders(options),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  };

  let response = await fetch(`${import.meta.env.VITE_BACK_END_API_URL}${url}`, config);


  if (response.ok) {
    return response.status === HttpStatus.NoContent ? ({} as TResponse) : (response.json() as TResponse);
  }else if(response.status !== HttpStatus.Unauthorized){
    const errorBody = await response.json();
    throw new Error(errorBody.Message || "Request failed");
  }
  else if (response.status === HttpStatus.Unauthorized && !useAuthStore.getState().accessToken) {

        const newToken = await refreshAccessToken();
        if(!newToken){
          window.location.href = PATH_ROUTER.Authentication;
        }
        useAuthStore.setState({ accessToken: newToken });
        const retryConfig = {
          ...init,
          headers: {
            ...init.headers,
            ...createHeaders(options),
            ...(newToken ? { Authorization: `Bearer ${useAuthStore.getState().accessToken}` } : {}),
          },
          credentials: "include",
        };

        response = await fetch(
          `${import.meta.env.VITE_BACK_END_API_URL}${url}`,
          retryConfig
        );

        if (response.ok) {
          return response.status === HttpStatus.NoContent
            ? ({} as TResponse)
            : (response.json() as TResponse);
        }

    }
}



const requester = {
  get: <TResponse>(url: string, options?: RequestOptions) => fetchCustom<TResponse>(url, { method: 'GET' }, options),
  delete: <TResponse>(url: string, options?: RequestOptions) => fetchCustom<TResponse>(url, { method: 'DELETE' }, options),
  post: <TResponse>(url: string, body?: BodyInit | null | undefined, options?: RequestOptions) =>
    fetchCustom<TResponse>(url, { method: 'POST', body: body || emptyRequestBody }, { contentType: 'application/json', ...options }),
  patch: <TResponse>(url: string, body: BodyInit, options?: RequestOptions) =>
    fetchCustom<TResponse>(url, { method: 'PATCH', body }, { contentType: 'application/json-patch+json', ...options }),
};

export default requester;