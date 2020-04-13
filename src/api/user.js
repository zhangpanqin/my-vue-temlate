import request from '@/utils/request';

const user = {
    helloWord() {
        return request({
            type: 'get',
            url: '/hello-word/2',
        });
    },
};

export default user;
