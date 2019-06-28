<template>
  <div class="main">
    <div class="main-backdrop"></div>
    <div class="main-header">
      <div class="main-container">
        <div class="main-header-title">
          <img class="main-header-icon" src="../assets/whatsapp.png" alt="logo">
          <div class="main-header-text">whatsapp replica web</div>
        </div>
      </div>
    </div>
    <div class="main-content"></div>
    <chat-modal />
  </div>
</template>

<script>
import ChatModal from '@/components/ChatModal'

export default {
  components: {
    ChatModal
  },
  data() {
    return {

    }
  }
}
</script>
