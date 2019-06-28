<template>
    <div class="profile">
        <div class="profile-avatar-block">

        </div>
        <div class="profile-section">
            <span>Your Name</span>
            <div>
                {{ this.$store.getters.getUserFullName }}
                <icon icon="edit" size="20"/>
            </div>
        </div>
        <div class="profile-placeholder-hint">
            
        </div>
        <div class="profile-section">
            <span>About</span>
            <div class="small">
                {{ this.$store.getters.getUserStatus }}
                <icon icon="edit" size="20"/>
            </div>
        </div>
    </div>
</template>

<script>
import { bus } from '@/main'
import { backendService } from '@/services/backendService'

export default {
    data() {
        return {
            frequentlyChats: [],
            searchedContacts: [],
            search: ''
        }
    },
    watch: {
        
    },
    methods: {
    }
}
</script>

