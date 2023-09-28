import axios from "axios";
export function setupAxiosMock(mockUrl, responseData, instance) {
    if (!instance) {
        instance = axios;
    }
    if (!instance.interceptors.mocks) {
        instance.interceptors.mocks = {};
        // install our interceptors
        instance.interceptors.request.use((config) => {
            const url = config.url;
            if (instance.interceptors.mocks[url]) {
                // if we have set up a mocked response for this url, cancel the actual request with a cancelToken containing our mocked data
                const mockedResponse = instance.interceptors.mocks[url];
                return {
                    ...config,
                    cancelToken: new axios.CancelToken((cancel) => cancel({ status: 200, data: mockedResponse })),
                };
            }
            // otherwise proceed with usual request
            return config;
        });
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            // resolve response with our mocked data
            if (axios.isCancel(error)) {
                return Promise.resolve(error.message);
            }
            // handle all other errors gracefully
            return Promise.reject(error);
        });
    }
    instance.interceptors.mocks[mockUrl] = responseData;
}
export function removeAxiosMock(mockUrl, instance) {
    if (!instance) {
        instance = axios;
    }
    delete (instance.interceptors.mocks || {})[mockUrl];
}
