<template>
    <div class="checkbox">
        <label>{{ label }}</label>
        <div>
            <input @change="handleInput" type="checkbox" v-model="check">
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    prop: ['value'],
    props: {
        label: String
    },
    data() {
        return  {
            check: this.value
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', this.check)
        }
    }
}
</script>
