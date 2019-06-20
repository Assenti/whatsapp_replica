<template>
    <button class="icon" :type="type ? type : 'button'">
        <i :class="`material-icons ${iconColor}`" :style="iconSize">{{ icon }}</i>
    </button>
</template>

<script>
export default {
    props: {
        icon: String,
        color: String,
        type: String,
        size: String | Number
    },
    computed: {
        iconColor() {
            return this.color ? `text-${this.color}` : ''
        },
        iconSize() {
            return this.size ? `font-size:${this.size}px` : ''
        }
    }
}
</script>