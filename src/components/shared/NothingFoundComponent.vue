<template>
  <div class="NothingFoundComponent">
    <h4 class="mt-10 ml-10">{{text}}</h4>
    <img src="https://image.shutterstock.com/image-photo/vintage-knife-fork-plate-on-260nw-197713559.jpg"
         alt="empty plate" width="350rem" style="margin-top: 3rem">
  </div>
</template>

<script>
  export default {
    name: 'FetchingData',
    props: {
      text: String
    }
  };
</script>
