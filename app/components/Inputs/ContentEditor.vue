<template>
  <div class="flex-1">
    <label
      v-if="title"
      :for="name"
      class="flex mb-2 font-sm text-stone-800 items-center"
    >
      <v-icon v-if="icon" :icon="icon" />

      <span>
        {{ title }}
      </span>
    </label>

    <div class="editor-container" v-if="editor">
      <div class="tools">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <v-icon icon="mdi-format-bold" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <v-icon icon="mdi-format-italic" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <v-icon icon="mdi-format-strikethrough" />
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <v-icon icon="mdi-xml" />
        </button>

        <div class="spacer"></div>

        <button @click="editor.chain().focus().unsetAllMarks().run()">
          <v-icon icon="mdi-format-clear" />
        </button>

        <button @click="editor.chain().focus().clearNodes().run()">
          <v-icon icon="mdi-filter-off-outline" />
        </button>

        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <v-icon icon="mdi-format-paragraph" />
        </button>

        <div class="spacer"></div>
        <!-- text align -->
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <v-icon icon="mdi-format-align-left" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <v-icon icon="mdi-format-align-center" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <v-icon icon="mdi-format-align-right" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <v-icon icon="mdi-format-align-justify" />
        </button>
        <div class="spacer"></div>

        <button
          v-for="level in 6"
          :key="level"
          :class="{ 'is-active': editor.isActive('heading', { level }) }"
          @click="editor.chain().focus().setHeading({ level }).run()"
        >
          <v-icon :icon="`mdi-format-header-${level}`" />
        </button>
        <div class="spacer"></div>

        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <v-icon icon="mdi-format-list-bulleted" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <v-icon icon="mdi-format-list-numbered" />
        </button>
        <div class="spacer"></div>

        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <v-icon icon="mdi-code-array" />
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <v-icon icon="mdi-format-quote-open" />
        </button>
        <button @click="editor.chain().focus().setHardBreak().run()">
          <v-icon icon="mdi-math-norm-box" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <v-icon icon="mdi-ray-end-arrow" />
        </button>
        <div class="spacer"></div>

        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <v-icon icon="mdi-undo" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <v-icon icon="mdi-redo" />
        </button>
      </div>
      <TiptapEditorContent :editor="editor" />
    </div>
    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { useField, ErrorMessage } from "vee-validate";

import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
// export { Image as TiptapImage } from '@tiptap/extension-image';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: "required",
  },
  placeholder: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
});

const { value, setValue } = useField(props.name, props.rules);
const modelValue = defineModel();

const editor = useEditor({
  extensions: [
    TiptapStarterKit,

    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  content: modelValue.value || value.value || "",
});

watch(
  () => editor?.value?.getHTML(),
  (v) => {
    setValue(v, true);
    modelValue.value = v;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss">
/* Basic editor styles */
.editor-container {
  @apply relative w-full h-full  bg-neutral-50 py-2;

  .tools {
    @apply shadow rounded-md bg-white flex gap-1 flex-wrap items-center w-fit mx-auto my-2 justify-center max-w-[90%];
    @apply overflow-hidden p-1;

    .spacer {
      @apply h-5 bg-neutral-400 opacity-80 w-[1px];
    }
  }

  .ProseMirror {
    @apply p-4 h-full focus:outline-none !min-h-[300px] bg-neutral-50 resize-y;
  }

  .is-active {
    @apply bg-blue-100 text-blue-600;
  }

  button {
    @apply px-3 py-1 rounded-md text-sm font-medium transition-colors;
    @apply hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }

  .tiptap p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    height: 0;
    pointer-events: none;
  }
  .tiptap {
    --purple-light: #f3e8ff; /* Soft lavender background */
    --black: #3b3c3a; /* Rich black for text and code */
    --white: #ffffff; /* White for contrast in dark code blocks */
    --gray-3: #d1d5db; /* Medium gray for borders (e.g. blockquote) */
    --gray-2: #e5e7eb; /* Light gray for horizontal rules */

    :first-child {
      margin-top: 0;
    }

    .tiptap.ProseMirror {
      @apply p-1 h-full focus:outline-none !min-h-[300px] resize-y;
    }

    /* List styles */
    ul,
    ol {
      padding: 0 1rem;
      margin: 1.25rem 1rem 1.25rem 0.4rem;

      li p {
        margin-top: 0.25em;
        margin-bottom: 0.25em;
      }
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
      margin-top: 2.5rem;
      text-wrap: pretty;
    }

    h1,
    h2 {
      margin-top: 3.5rem;
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    h4 {
      font-size: 1.3rem;
    }
    h5 {
      font-size: 1.2rem;
    }
    h6 {
      font-size: 1.1rem;
    }

    /* Code and preformatted text styles */
    code {
      background-color: var(--purple-light);
      border-radius: 0.4rem;
      color: var(--black);
      font-size: 0.85rem;
      padding: 0.25em 0.3em;
    }

    pre {
      background: var(--black);
      border-radius: 0.5rem;
      color: var(--white);
      font-family: "JetBrainsMono", monospace;
      margin: 1.5rem 0;
      padding: 0.75rem 1rem;

      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }
    }

    blockquote {
      border-left: 3px solid var(--gray-3);
      margin: 1.5rem 0;
      padding-left: 1rem;
    }

    hr {
      border: none;
      border-top: 1px solid var(--gray-2);
      margin: 2rem 0;
    }

    ol {
      list-style-type: decimal;
    }
    ul {
      list-style-type: disc;
    }
  }
}
</style>
