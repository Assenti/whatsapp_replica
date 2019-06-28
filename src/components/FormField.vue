<template>
    <div class="form-field">
        <label>{{ label }}</label>
        <div>
            <i class="material-icons"
                :class="{'text-red': msg }">
                {{ icon }}</i>
            <input
                :name="label"
                v-model="content"
                :autocomplete="autocomplete ? 'on' : 'off'"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur" 
                :type="type ? type : 'text'"
                :placeholder="placeholder"/>
        </div>
        <span class="animated shake faster" v-if="msg">{{ msg }}</span>
    </div>
</template>

<script>
export default {
    prop: ['value'],
    props: {
        icon: String,
        label: String,
        placeholder: String,
        type: String,
        msg: String,
        autocomplete: Boolean
    },
    data() {
        return {
            content: this.value
        }
    },
    mounted() {
        this.$parent.$on('clearField', () => {
            this.content = ''
        })
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', this.content)
        },
        handleFocus() {
            
        },
        handleBlur() {

        }
    }
}
</script>
