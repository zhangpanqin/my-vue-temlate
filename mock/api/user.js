export default [
    // hello word
    {
        url: '/hello-word/1',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: {
                    str: 44
                }
            };
        }
    },
    {
        url: '/hello-word/2',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: {
                    str: 2233
                }
            };
        }
    },
]
