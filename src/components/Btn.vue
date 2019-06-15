<template>
    <div class="btn" :class="{'block': block }">
        <button :type="type">{{ btnTitle }}</button>
    </div>
</template>

<script>
export default {
    props: ['btnTitle', 'type', 'block'],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
