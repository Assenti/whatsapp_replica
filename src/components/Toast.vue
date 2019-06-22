<template>
    <div class="toast">
        <div>{{ text }}</div>
        <i class="material-icons" @click="handleClick">close</i>
    </div>
</template>

<script>
export default {
    props: {
        text: String
    },
    methods: {
        handleClick() {
            this.$emit('closed')
        }
    }
}
</script>

