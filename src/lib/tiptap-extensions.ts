// lib/tiptap-extensions.ts

import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"

// 1) Always-available extensions
const baseExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4, 5, 6] },
    codeBlock: false, // we'll add our own below
  }),
  Highlight,
  Typography,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { class: "text-blue-500 underline" },
  }),
  Image.configure({ allowBase64: true, inline: true }),
  Placeholder.configure({ placeholder: "Write something..." }),
]

let lowlightExtension: any[] = []

if (typeof window !== "undefined") {
  // 2) Browser-only: pull in lowlight and grammars
  //    We use require() so that Webpack can tree-shake this out of the server build.
  //    (You could also use dynamic import inside a useEffect, but this is the simplest.)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { common, createLowlight } = require("lowlight")
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const css = require("highlight.js/lib/languages/css.js")
  const js = require("highlight.js/lib/languages/javascript.js")
  const ts = require("highlight.js/lib/languages/typescript.js")
  const xml = require("highlight.js/lib/languages/xml.js")
  const python = require("highlight.js/lib/languages/python.js")
  const bash = require("highlight.js/lib/languages/bash.js")
  const json = require("highlight.js/lib/languages/json.js")

  const lowlight = createLowlight(common)
  // register each grammar
  lowlight.register({ css })
  lowlight.register({ js })
  lowlight.register({ javascript: js })
  lowlight.register({ ts })
  lowlight.register({ typescript: ts })
  lowlight.register({ html: xml })
  lowlight.register({ xml })
  lowlight.register({ python })
  lowlight.register({ bash })
  lowlight.register({ json })

  lowlightExtension = [
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: {
        class: "rounded-md bg-gray-950 p-4 font-mono text-sm",
      },
    }),
  ]
}

export const extensions = [
  ...baseExtensions,
  // only included in the browser bundle:
  ...lowlightExtension,
]
