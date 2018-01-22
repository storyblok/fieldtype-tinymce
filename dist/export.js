(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PluginMce = require('./PluginMce.vue');

var _PluginMce2 = _interopRequireDefault(_PluginMce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: {
    charCount: function charCount() {
      return this.model.content.length;
    }
  },
  data: function data() {
    return {
      config: {
        plugins: 'fullscreen link lists code visualblocks',
        menubar: false,
        toolbar: 'styleselect | link | numlist bullist | removeformat code',
        style_formats: [{ title: 'Block', items: [{ title: 'Paragraph', format: 'p' }, { title: 'Header 1', format: 'h1' }, { title: 'Header 2', format: 'h2' }, { title: 'Header 3', format: 'h3' }, { title: 'Header 4', format: 'h4' }, { title: 'Header 5', format: 'h5' }, { title: 'Header 6', format: 'h6' }, { title: 'Blockquote', format: 'blockquote' }] }, { title: 'Inline', items: [{ title: 'Bold', icon: 'bold', format: 'bold' }, { title: 'Italic', icon: 'italic', format: 'italic' }] }, { title: 'Alignment', items: [{ title: 'Text Right', icon: 'alignright', selector: 'p, div, blockquote', classes: 'text-right' }, { title: 'Text Center', icon: 'aligncenter', selector: 'p, div, blockquote', classes: 'text-center' }, { title: 'Text Left', icon: 'alignleft', selector: 'p, div, blockquote', classes: 'text-left' }] }, { title: 'Styles', items: [{ title: 'Text Pink', selector: '*', classes: 'text-pink-carnation' }] }]
      },
      tinyLoaded: false
    };
  },

  mixins: [window.Storyblok.plugin],
  components: {
    PluginMce: _PluginMce2.default
  },
  methods: {
    initWith: function initWith() {
      return {
        plugin: 'tiny',
        content: ''
      };
    },
    initEditor: function initEditor() {
      this.tinyLoaded = true;
    },
    handleInput: function handleInput(value) {
      this.model.content = value;
    }
  },
  events: {
    'plugin:created': function pluginCreated() {
      this.tinyLoaded = false;

      if (typeof tinymce !== 'undefined') {
        this.$nextTick(this.initEditor);
      } else {
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js', this.initEditor);
      }
    },
    'plugin:destroyed': function pluginDestroyed() {
      window.tinymce.remove();
      this.tinyLoaded = false;
    }
  },
  watch: {
    'model': {
      handler: function handler(value) {
        this.$emit('changed-model', value);
      },

      deep: true
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div><div v-if=tinyLoaded><plugin-mce :value=model.content @input=handleInput :config=config></plugin-mce></div></div>"

},{"./PluginMce.vue":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    value: {
      type: String,
      default: ''
    },
    initialValue: {
      type: String,
      default: ''
    }
  },

  data: function data() {
    return {
      instance: null
    };
  },

  computed: {
    content: {
      cache: false,
      get: function get() {
        return this.instance.getContent();
      }
    }
  },

  methods: {
    handleError: function handleError(err) {
      this.$emit('error', err);
    },
    handleSuccess: function handleSuccess(editor) {
      this.instance = editor;
      this.$emit('init', editor);

      var content = this.initialValue || this.value;

      editor.setContent(content);
      editor.on('input change undo redo setcontent', this.handleInput);
      editor.on('change setcontent', this.handleChange);
    },
    setContent: function setContent(content) {
      var instance = this.instance;

      if (instance) {
        instance.setContent(content);

        return true;
      }

      return false;
    },
    handleInput: function handleInput() {
      this.$emit('input', this.instance.getContent());
    },
    handleChange: function handleChange() {
      this.$emit('change', this.instance.getContent());
    }
  },

  watch: {
    initialValue: function initialValue(newValue) {
      this.setContent(newValue);
    }
  },

  ready: function ready() {
    if (!window.tinymce) {
      return this.handleError(new Error("TinyMce wasn't found"));
    }

    var config = this.config;
    var target = this.$els.textarea;

    config.target = target;
    config.init_instance_callback = this.handleSuccess;

    window.tinymce.init(config).catch(this.handleError);
  },
  beforeDestroy: function beforeDestroy() {
    this.$emit('destroy', this.instance);
    window.tinymce.remove(this.$els.textarea);
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=tinymce><div class=tinymce__init-area v-el:textarea=\"\"></div></div>"

},{}],3:[function(require,module,exports){
'use strict';

var _Plugin = require('../Plugin.vue');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = _Plugin2.default.methods.initWith();

window.storyblok.field_types[init.plugin] = _Plugin2.default;

},{"../Plugin.vue":1}]},{},[3]);
