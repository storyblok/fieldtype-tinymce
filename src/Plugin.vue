<template>
  <div>
    <textarea v-model="model.content" class="uk-width-1-1 js-textarea"></textarea>
  </div>
</template>

<script>
export default {
  computed: {
    charCount() {
      return this.model.content.length
    }
  },
  data() {
    return {
      initialized: false
    }
  },
  mixins: [window.Storyblok.plugin],
  methods: {
    initWith() {
      return {
        plugin: 'storyblok-tinymce',
        content: ''
      }
    },
    initEditor() {
      tinymce.init({
        target: this.$el.querySelector('.js-textarea'),
        plugins: 'fullscreen link',
        menubar: false,
        toolbar: 'undo redo | bold italic | link | fullscreen',
        init_instance_callback: (editor) => {
          editor.on('input change undo redo setcontent', () => {
            this.model.content = editor.getContent()
          })
          this.initialized = true
        }
      })

      if (this.initialized) {
        tinymce.get(this.$el.querySelector('.js-textarea').id).setContent(this.model.content)
      }
    }
  },
  events: {
    'plugin:created'() {
      if (typeof tinymce !== 'undefined') {
        this.$nextTick(this.initEditor)
      } else {
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js', this.initEditor)
      }
    },
    'plugin:destroyed'() {
      console.log('plugin:destroyed')
    }
  },
  watch: {
    'model': {
      handler(value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
