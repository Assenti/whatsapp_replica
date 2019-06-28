<template>
  <div class="chat-modal-wrapper">
    <div class="chat-modal">
      <div class="chat-modal-block">
        <div class="headline pa-10 text-center">
          Pass the authorization to use WhatsApp Replica on your PC
        </div> 
      </div>
      <div class="chat-modal-block">
        <div class="chat-modal-block-title">
          {{ view }} to start communication
        </div>
        <div class="chat-modal-block-content">
          <component :is="current" class="animated bounceInRight fast"/>
        </div>
        <div class="chat-modal-block-footer">
          <div v-if="view === 'Sign in'">
            Don't have an account yet? <span @click="switchView('Register')" class="link">Register</span>
          </div>
          <div v-else>
            Already have an account? <span @click="switchView('Sign in')" class="link">Sign In</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  components: {
    Login, Register
  },
  data() {
    return {
      current: Login,
      view: 'Sign in'
    }
  },
  methods: {
    switchView(view) {
      if(view === 'Register') {
        this.current = Register
        this.view = view
      }
      else {
        this.current = Login
        this.view = view
      }
    }
  }
}
</script>
