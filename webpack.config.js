const config = {
    devtool: 'source-map',
    // the other mode is production
    mode: 'development',
    entry: {
        // register here separate js files
        index: './src/pairs.mjs',
    },
    output: {
        filename: 'pairs.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        // ... rest of the resolve config
        fallback: {
          "console": false
        }
    }
}

module.exports = config;