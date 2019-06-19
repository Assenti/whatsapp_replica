<template>
    <div class="drawer">
        <div class="drawer-toolbar">
            <div>
                <div @click="closeDrawer">
                    <icon icon="arrow_back" 
                    color="white"/>
                </div>
                <span>New Chat</span>
            </div>
        </div>
        <div class="drawer-search-block"></div>
        <div class="drawer-content">

        </div>
    </div>
</template>

<script>
import { bus } from '@/main'
export default {
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
