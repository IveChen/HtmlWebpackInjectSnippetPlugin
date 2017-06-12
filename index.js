function inject(content, snippet, config) {
    return content.replace(config.reg, function (matchStr) {
        if (config.action == 'append') {
            return matchStr + snippet;
        } else if (config.action == 'prepend') {
            return snippet + matchStr;
        }
    });
}

function HtmlWebpackInjectSnippetPlugin(options) {
    this.options = options;
}

HtmlWebpackInjectSnippetPlugin.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (pluginData, callback) {
            if (self.options.snippets && self.options.snippets instanceof Array) {
                self.options.snippets.forEach(function (item, key) {
                    var newItem = Object.assign({}, {
                        isOpenTag: true,
                        global: false
                    }, item);
                    if (!newItem.action) {
                        newItem.action = newItem.isOpenTag ? 'append' : 'prepend';
                    }
                    if (newItem.snippet) {
                        var reg;
                        if (newItem.isOpenTag) {
                            reg = new RegExp('<' + newItem.tag + '[^>]*>', newItem.global ? 'g' : '');
                        } else {
                            reg = new RegExp('</' + newItem.tag + '>', newItem.global ? 'g' : '');
                        }
                        pluginData.html = inject(pluginData.html, newItem.snippet, {
                            reg: reg,
                            action: newItem.action
                        });
                    }
                });
            }
            callback(null, pluginData);
        });
    });
};

module.exports = HtmlWebpackInjectSnippetPlugin;