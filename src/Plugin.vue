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
  mixins: [window.Storyblok.plugin],
  methods: {
    initWith: function() {
      return {
        plugin: 'storyblok-tinymce',
        content: ''
      }
    },
    initEditor: function() {
      tinymce.init({
        target: this.$el.querySelector('.js-textarea'),
        plugins: 'fullscreen link',
        menubar: false,
        toolbar: 'undo redo | bold italic | link | fullscreen',
        init_instance_callback: function(editor) {
          editor.on('input change undo redo setcontent', function() {
            this.model.content = editor.getContent()
          }.bind(this))
        }.bind(this)
      })
    }
  },
  events: {
    'plugin:created': function() {
      jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js', this.initEditor)
    },
    'plugin:destroyed': function() {
      console.log('plugin:destroyed')
    }
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
