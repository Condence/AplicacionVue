<template>
  <div class="home">
    <Publicaciones/>
  </div>
</template>

<script>
// @ is an alias to /src
import Publicaciones from '@/components/Publicaciones.vue'

export default {
  name: 'home',
  components: {
    Publicaciones
  }
}
</script>
