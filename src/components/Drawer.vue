<template>
    <div class="drawer">
        <div class="drawer-toolbar">
            <div>
                <div @click="closeDrawer">
                    <icon icon="arrow_back" 
                    color="white"/>
                </div>
                <span>{{ header }}</span>
            </div>
        </div>
        <slot name="content" class="drawer-content"></slot>
    </div>
</template>

<script>
import { bus } from '@/main'
export default {
    props: {
        header: String
    },
    data() {
        return {
        }
    },
    methods: {
        closeDrawer() {
            bus.$emit('closeDrawer')
        }
    }
}
</script>
