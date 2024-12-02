// cliente-servicio-tecnico/webpack.config.js

const path = require('path');

module.exports = {
    // Otras configuraciones de Webpack
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "fs": false,
            "http": require.resolve("stream-http"),
            "url": require.resolve("url"),
            "buffer": require.resolve("buffer/"),
            "net": false,
            "tls": false,
            "util": require.resolve("util/"),
        },
    },
    module: {
        rules: [
            // Otras reglas de Webpack
            {
                test: /\.css$/,  // Aplica a los archivos .css
                use: [
                    'style-loader', // Inserta los CSS en el DOM
                    'css-loader',   // Interpreta los archivos CSS
                ],
            },
        ],
    },
};
