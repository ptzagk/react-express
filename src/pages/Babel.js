import React from "react";
import markdown from "markdown-in-js";

import CodeBlock from "../components/CodeBlock";
import DefaultPage from "./DefaultPage";
import markdownOptions from "../utils/MarkdownOptions";

const content = markdown(markdownOptions)`
Babel is a highly configurable parser that lets you use experimental JavaScript features and extensions, compiling down into old-style JavaScript that can be supported on a wider range of platforms. Of course, if a native platform doesn't support an ES2015 feature like \`Promise()\`, Babel won't fully be able to help -- but it can in many cases polyfill missing APIs to provide this functionality.

Babel enables debugging of the the original source code by including **source maps** with the compiled JavaScript. JavaScript interpreters will run the compiled code, but map it to the source code in the debugger so that you can debug the source code instead of the (generally quite ugly) compiled output.

# Plugins, presets, and stages

Babel comes in two parts: the core, and plugins. Each individual language feature that Babel can compile, such as ES2015 classes, has a separate plugin. Collections of plugins are grouped into **presets**, so that you don't have to install hundreds of individual dependencies.

Babel groups experimental language features into presets called **stages**, with \`stage-0\` being the most experimental (i.e. these may not make it into the official language spec) and \`stage-3\` (these features aren't going anywhere).

# Which presets should I use?

You'll need the \`react\` preset to use the React JSX language extension. You'll almost certainly want the \`es2015\` preset, which includes plugins for compiling ES2015 features. And then you'll likely want to choose a \`stage\` preset - I recommend \`stage-1\` as a good balance between practical and safe to use.

If you want to use the new \`async\` and \`await\` keywords, you'll also need to include Babel's runtime library. If you don't know what these keywords are, we'll cover them [later](async_await), but I generally recommend installing the runtime and using them.

# With Webpack

To use Babel in a project bundled with Webpack, you should use [babel-loader](https://github.com/babel/babel-loader). You can install the necessary dependencies with

${(
  <CodeBlock
  >{`npm install --save-dev babel-loader babel-core babel-preset-react babel-preset-es2015 babel-preset-stage-1 babel-plugin-transform-runtime

npm install --save babel-runtime
`}</CodeBlock>
)}

Note that we install everything except \`babel-runtime\` as a dev dependency (only used in the build process), but \`babel-runtime\` as a real dependency (required during runtime).

We can then add the \`babel-loader\` into our \`webpack.config.js\`.

${(
  <CodeBlock filename={"webpack.config.js"}>{`module.exports = options => {
  return {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
  }
}`}</CodeBlock>
)}

We add a \`module\` section if we don't have one already, specifying a new rule for loading \`.js\` files. We configure webpack to load all \`.js\` files with the \`babel-loader\`, so that files are transformed into browser-safe JavaScript. We exclude files in \`node_modules\`, since the libraries we install here should already be compiled by the library authors, and because Babel can get slow when watching too many files at once. We specify the \`cacheDirectory\` option to improve performance by caching compiled files.

# Babel Configuration

You can configure Babel by including a \`.babelrc\` file in the root directory of your project. Here you can specify which presets and plugins to use.

Given the presets we downloaded above, our \`.babelrc\` file should look like

${(
  <CodeBlock filename={".babelrc"}>{`{
  "presets": [
    ["es2015", {"modules": false}],
    "stage-1",
    "react"
  ],
  "plugins": [
    "transform-runtime"
  ]
}`}</CodeBlock>
)}

Note that we want to use the \`es2015\` preset with the \`modules\` option set to \`false\`, since Webpack can better optimize our code this way. This is a new feature as of Webpack 2.
`;

export default props => <DefaultPage {...props}>{content}</DefaultPage>;
