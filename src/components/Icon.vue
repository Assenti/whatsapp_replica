<template>
    <div class="icon">
        <i :class="`material-icons ${iconColor}`">{{ icon }}</i>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        color: String
    },
    computed: {
        iconColor() {
            return this.color ? `${this.color}-text` : ''
        }
    }
}
</script>