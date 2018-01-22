<template>
  <div>
    <div v-if="tinyLoaded">
      <plugin-mce :value="model.content" @input="handleInput" :config="config"></plugin-mce>
    </div>
  </div>
</template>

<script>
import PluginMce from './PluginMce.vue';

export default {
  computed: {
    charCount() {
      return this.model.content.length
    }
  },
  data() {
    return {
      config: {
        plugins: 'fullscreen link lists code visualblocks',
        menubar: false,
        toolbar: 'styleselect | link | numlist bullist | removeformat code',
        style_formats: [ {title: 'Block', items: [ {title: 'Paragraph', format: 'p'}, {title: 'Header 1', format: 'h1'}, {title: 'Header 2', format: 'h2'}, {title: 'Header 3', format: 'h3'}, {title: 'Header 4', format: 'h4'}, {title: 'Header 5', format: 'h5'}, {title: 'Header 6', format: 'h6'}, {title: 'Blockquote', format: 'blockquote'}, ]}, {title: 'Inline', items: [ {title: 'Bold', icon: 'bold', format: 'bold'}, {title: 'Italic', icon: 'italic', format: 'italic'}, ]}, {title: 'Alignment', items: [ {title: 'Text Right', icon: 'alignright', selector: 'p, div, blockquote', classes: 'text-right'}, {title: 'Text Center', icon: 'aligncenter', selector: 'p, div, blockquote', classes: 'text-center'}, {title: 'Text Left', icon: 'alignleft', selector: 'p, div, blockquote', classes: 'text-left'}, ]}, {title: 'Styles', items: [ {title: 'Text Pink', selector: '*', classes: 'text-pink-carnation'}, ]} ]
      },
      tinyLoaded: false
    }
  },
  mixins: [window.Storyblok.plugin],
  components: {
    PluginMce
  },
  methods: {
    initWith() {
      return {
        plugin: 'tiny',
        content: ''
      }
    },
    initEditor() {
      this.tinyLoaded = true
    },
    handleInput(value) {
      this.model.content = value
    }
  },
  events: {
    'plugin:created'() {
      this.tinyLoaded = false

      if (typeof tinymce !== 'undefined') {
        this.$nextTick(this.initEditor)
      } else {
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js', this.initEditor)
      }
    },
    'plugin:destroyed'() {
      window.tinymce.remove()
      this.tinyLoaded = false
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
