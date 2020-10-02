<template>
  <app-layout>
    <template v-slot:title>
      {{$t('dashboard.title')}}
    </template>

    <template v-slot:content>
      <portal to="modal">
        <modal>
          <h1>Example Modal</h1>
        </modal>
      </portal>

      <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sit
        amet faucibus nunc. Aliquam accumsan sapien vitae luctus lobortis.
        Integer mattis lorem at enim pulvinar porta. Aenean quis mattis arcu.
        Aliquam vel diam malesuada, auctor neque varius, pellentesque tortor.
        Aenean faucibus nisl et ante venenatis porttitor. Phasellus malesuada
        enim eget faucibus pharetra. Sed dapibus ipsum in pulvinar finibus.
        Maecenas eu nisl non nibh euismod aliquet. Donec blandit finibus
        sagittis. Sed finibus, sem fermentum auctor pretium, mi nulla
        lobortis est, et viverra lacus ipsum vitae justo. Vestibulum et
      </p>

      <div class="flex justify-center items-center p-4">
        <base-button @click.prevent="$nuxt.$emit('modal:show')">Open Modal</base-button>
      </div>
    </template>
  </app-layout>
</template>

<script>
import Modal from '~/components/Modal.vue';
import BaseButton from '~/components/Button.vue';

export default {
  components: {
    Modal,
    BaseButton,
  },
};
</script>
