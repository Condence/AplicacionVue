<template>
  <div class="home">
    <Amigos/>
  </div>
</template>

<script>
// @ is an alias to /src
import Amigos from '@/components/Amigos.vue'

export default {
  name: 'home',
  components: {
    Amigos
  }
}
</script>
