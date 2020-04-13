<template>
    <div class="about">
        <h1>This is an about page</h1>
        <h2>{{msg}}</h2>
    </div>
</template>
<script>
import user from '@/api/user';

export default {
    name: 'About',
    data() {
        return {
            msg: '默认消息',
        };
    },
    async mounted() {
        await user.helloWord().then((data) => {
            this.msg = JSON.stringify(data);
        });
    },
};
</script>
