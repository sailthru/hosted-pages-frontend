const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function ({ basePath }) {
  if (!basePath) {
    throw new Error(
      'Missing required arg, "basePath"; example: npm run build -- --env "basePath=http://localhost:9020"'
    );
  }
  return {
    mode: "production",
    entry: path.join(__dirname, "../src", "index.js"),
    output: {
      clean: true, // wipe "dist" before each build
      assetModuleFilename: "images/[hash][ext][query]", // keep dist tidy by outputting img assets to subdirectory
    },
    optimization: {
      splitChunks: {
        // Extract common dependencies into separate chunk(s) for better performance
        // https://webpack.js.org/guides/code-splitting/#splitchunksplugin
        chunks: "all",
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|svg)(\?[\s\S]+)?$/,
          type: "asset/resource",
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
      ],
    },
    resolve: {
      // Import files in src code without having to specify extension
      extensions: [".js", ".jsx"],
    },
    plugins: [
      // HtmlWebpackPlugin appends js, css bundles to an HTML file
      // Automates script management and enables us to use chunks with dynamic names
      new HtmlWebpackPlugin({
        inject: false, // Define a custom template to avoid <head> tags in template
        publicPath: `${basePath}`, // Set absolute path to js, css assets; required because artifacts are served from s3, not Webpack
        templateContent: ({ htmlWebpackPlugin }) => `
          ${htmlWebpackPlugin.tags.headTags}
          <div id="app"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
        `,
      }),
    ],
  };
};
