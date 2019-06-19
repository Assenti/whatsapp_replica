<template>
    <button class="icon" :type="type ? type : 'button'">
        <i :class="`material-icons ${iconColor}`">{{ icon }}</i>
    </button>
</template>

<script>
export default {
    props: {
        icon: String,
        color: String,
        type: String
    },
    computed: {
        iconColor() {
            return this.color ? `text-${this.color}` : ''
        }
    }
}
</script>