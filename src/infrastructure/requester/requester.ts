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
    `${import.meta.env.VITE_BACK_END_API_URL}/Auth/refresh`,
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
  console.log("from the fetch custom "+token)
  const config = {
    ...init,
    headers: {
      ...init.headers,
      ...createHeaders(options),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  };

  var response = await fetch(`${import.meta.env.VITE_BACK_END_API_URL}${url}`, config);

  if (response.ok) {
    // if (timerPing) {
    //   clearInterval(timerPing);
    // }

    // timerPing = setInterval(
    //   async () => {
    //     await requester.user();
    //   },
    //   10 * 60 * 1000,
    // );

    return response.status === HttpStatus.NoContent ? ({} as TResponse) : (response.json() as TResponse);
  }else{
    console.log(response.status)
    console.log(response)
  }

  if (response.status === HttpStatus.Unauthorized && !useAuthStore.getState().accessToken) {
    const newToken = await requester.post(`${api.post.refresh()}`)
    console.log("token from unauth"+newToken.accessToken)
    useAuthStore.setState({ accessToken: newToken.accessToken });
    // if (newToken) {
      // useAuthStore.getState().setAccessToken(newToken);

      const retryConfig = {
        ...init,
        headers: {
          ...init.headers,
          ...createHeaders(options),
          ...(newToken.accessToken ? { Authorization: `Bearer ${useAuthStore.getState().accessToken}` } : {}),
        },
        credentials: "include",
      };

      console.log("The Access Token isn't working like what the hell")

      response = await fetch(
        `${import.meta.env.VITE_BACK_END_API_URL}${url}`,
        retryConfig
      );

      if (response.ok) {
        return response.status === HttpStatus.NoContent
          ? ({} as TResponse)
          : (response.json() as TResponse);
      }
    // }
    

  throw new Problem({
    title: response.statusText,
    status: response.status,
  });
}else{
  window.location.href = PATH_ROUTER.Authentication;
}

}

const requester = {
  get: <TResponse>(url: string, options?: RequestOptions) => fetchCustom<TResponse>(url, { method: 'GET' }, options),
  post: <TResponse>(url: string, body?: BodyInit | null | undefined, options?: RequestOptions) =>
    fetchCustom<TResponse>(url, { method: 'POST', body: body || emptyRequestBody }, { contentType: 'application/json', ...options }),
  patch: <TResponse>(url: string, body: BodyInit, options?: RequestOptions) =>
    fetchCustom<TResponse>(url, { method: 'PATCH', body }, { contentType: 'application/json-patch+json', ...options }),
//   user: () => fetchUser(),
};

export default requester;