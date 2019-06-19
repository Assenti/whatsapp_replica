<template>
    <div class="btn" 
        :class="{'block': block }">
        <button :disabled="disabled ? disabled : false" 
            :type="type">{{ btnTitle }}</button>
    </div>
</template>

<script>
export default {
    props: ['btnTitle', 'type', 'block', 'disabled'],
    data() {
        return {

        }
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>
