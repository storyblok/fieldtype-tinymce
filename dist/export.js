(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  computed: {
    charCount: function charCount() {
      return this.model.content.length;
    }
  },
  data: function data() {
    return {
      initialized: false
    };
  },

  mixins: [window.Storyblok.plugin],
  methods: {
    initWith: function initWith() {
      return {
        plugin: 'storyblok-tinymce',
        content: ''
      };
    },
    initEditor: function initEditor() {
      var _this = this;

      tinymce.init({
        target: this.$el.querySelector('.js-textarea'),
        plugins: 'fullscreen link',
        menubar: false,
        toolbar: 'undo redo | bold italic | link | fullscreen',
        init_instance_callback: function init_instance_callback(editor) {
          editor.on('input change undo redo setcontent', function () {
            _this.model.content = editor.getContent();
          });
          _this.initialized = true;
        }
      });

      if (this.initialized) {
        tinymce.get(this.$el.querySelector('.js-textarea').id).setContent(this.model.content);
      }
    }
  },
  events: {
    'plugin:created': function pluginCreated() {
      if (typeof tinymce !== 'undefined') {
        this.$nextTick(this.initEditor);
      } else {
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js', this.initEditor);
      }
    },
    'plugin:destroyed': function pluginDestroyed() {
      console.log('plugin:destroyed');
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
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div><textarea v-model=model.content class=\"uk-width-1-1 js-textarea\"></textarea></div>"

},{}],2:[function(require,module,exports){
'use strict';

var _Plugin = require('../Plugin.vue');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = _Plugin2.default.methods.initWith();

window.storyblok.field_types[init.plugin] = _Plugin2.default;

},{"../Plugin.vue":1}]},{},[2]);
