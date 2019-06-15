<template>
  <div class="chat-modal-wrapper">
    <div class="chat-modal">
      <login class="chat-modal-block" />
      <register class="chat-modal-block" />
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  components: {
    Login, Register
  }
}
</script>
