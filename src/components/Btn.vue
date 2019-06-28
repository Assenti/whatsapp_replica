<template>
    <div class="btn" 
        :class="{'block': block }">
        <button :disabled="disabled ? disabled : false" 
            :type="type">{{ btnTitle }}</button>
    </div>
</template>

<script>
export default {
    props: {
        btnTitle: String,
        type: String,
        block: Boolean,
        disabled: Boolean
    },
    data() {
        return {

        }
    }
}
</script>
