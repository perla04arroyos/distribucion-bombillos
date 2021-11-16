<template>
  <div class="mb-4">
    <nav class="navbar navbar-dark bg-warning">
        <div class="container-fluid">
            <a class="navbar-brand">Distribución de Bombillos</a>
            <Form />
        </div>
    </nav>      
  </div>
</template>

<script>
import Form from './Form'

export default {
  name: 'Navbar',
  components: { Form }
}
</script>