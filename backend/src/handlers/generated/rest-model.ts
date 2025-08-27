import { z } from 'zod';

export type Post = z.infer<typeof Post>;
export const Post = z.object({
    postId: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    userId: z.string().optional(),
});

export type GetPostsResponse = z.infer<typeof GetPostsResponse>;
export const GetPostsResponse = z.object({
    message: z.string(),
    posts: z.union([z.array(Post), z.undefined()]).optional(),
});

export type CreatePostRequest = z.infer<typeof CreatePostRequest>;
export const CreatePostRequest = z.object({
    description: z.string(),
});

export type CreatePostResponse = z.infer<typeof CreatePostResponse>;
export const CreatePostResponse = z.object({
    message: z.string(),
    post: z.union([Post, z.undefined()]).optional(),
});

export type get_CreatePost = typeof get_CreatePost;
export const get_CreatePost = {
    method: z.literal('GET'),
    path: z.literal('/v1/posts'),
    requestFormat: z.literal('json'),
    parameters: z.never(),
    response: GetPostsResponse,
};

export type post_CreatePost = typeof post_CreatePost;
export const post_CreatePost = {
    method: z.literal('POST'),
    path: z.literal('/v1/posts'),
    requestFormat: z.literal('json'),
    parameters: z.object({
        body: CreatePostRequest,
    }),
    response: CreatePostResponse,
};

// <EndpointByMethod>
export const EndpointByMethod = {
    get: {
        '/v1/posts': get_CreatePost,
    },
    post: {
        '/v1/posts': post_CreatePost,
    },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod['get'];
export type PostEndpoints = EndpointByMethod['post'];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export interface EndpointParameters {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
}

export type MutationMethod = 'post' | 'put' | 'patch' | 'delete';
export type Method = 'get' | 'head' | 'options' | MutationMethod;

type RequestFormat = 'json' | 'form-data' | 'form-url' | 'binary' | 'text';

export interface DefaultEndpoint {
  parameters?: EndpointParameters | undefined;
  response: unknown;
}

export interface Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  parameters?: TConfig['parameters'];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig['response'];
}

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint['response']>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
    baseUrl = '';

    constructor(public fetcher: Fetcher) {}

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
        return this;
    }

    // <ApiClient.get>
    get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
        path: Path,
        ...params: MaybeOptionalArg<z.infer<TEndpoint['parameters']>>
    ): Promise<z.infer<TEndpoint['response']>> {
        return this.fetcher('get', this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint['response']>>;
    }
    // </ApiClient.get>

    // <ApiClient.post>
    post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
        path: Path,
        ...params: MaybeOptionalArg<z.infer<TEndpoint['parameters']>>
    ): Promise<z.infer<TEndpoint['response']>> {
        return this.fetcher('post', this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint['response']>>;
    }
    // </ApiClient.post>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
    return new ApiClient(fetcher).setBaseUrl(baseUrl ?? '');
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
