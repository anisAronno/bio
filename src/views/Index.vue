<template>
  <section class="p-5 dark:bg-gray-900 dark:text-white">
    <div class="dashboard-container">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, harum officia cumque placeat
      maiores cupiditate maxime alias delectus facilis tenetur. Mollitia accusantium consequatur
      exercitationem quis quam neque. Reiciendis adipisci aspernatur perspiciatis molestiae ab,
      fugiat exercitationem. Tempora cumque numquam nam laudantium recusandae veniam harum
      doloremque error magni. Ea nobis aperiam quibusdam vero asperiores, fuga voluptatibus illum
      nihil nemo voluptatum consectetur optio ad velit explicabo aliquid voluptate ducimus iste
      molestiae eaque magnam beatae, laboriosam consequuntur! Veniam iste illo nemo expedita?
      Explicabo neque in saepe accusantium! Ex sint expedita aliquid voluptas cumque vero libero
      ipsum ratione obcaecati at, dignissimos voluptates accusamus asperiores accusantium rerum
      beatae maiores numquam non ullam est saepe perferendis explicabo? Reiciendis veniam rem error
      corrupti dolore aspernatur maiores necessitatibus dolorum. Tempore animi, unde aut impedit
      expedita labore blanditiis odit, quasi assumenda sunt deleniti nulla voluptate provident
      magnam. Fugiat sint necessitatibus nihil, exercitationem, labore voluptas deserunt nisi
      repellendus magnam animi maxime voluptatum maiores iusto enim, explicabo placeat debitis
      excepturi? Dignissimos nulla suscipit fugiat expedita? Quos eaque distinctio molestiae
      inventore unde, odit velit! Neque, ipsum. Deleniti a animi velit. Totam, nisi accusamus
      similique veritatis quibusdam blanditiis labore? Qui quas reprehenderit eligendi, aut,
      officiis eos consectetur maxime ducimus, error fugiat ipsam mollitia nihil.
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['loaded', 'toaster'])

onMounted(() => {
  emit('loaded')
})
</script>

<style lang="scss" scoped>
.down::after {
  content: '\2304';
  float: right;
  font-size: 20px;
  font-weight: 500;
}
.up::after {
  content: '\2303';
  float: right;
  font-size: 20px;
  font-weight: 500;
}
</style>
