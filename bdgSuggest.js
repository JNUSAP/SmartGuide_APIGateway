const config = require('./config.json');

function BdgSuggest(id, title, content) {
    /* */
    if (id === undefined) return new NullSuggest();
    this.suggestId = id;
    this.suggestTitle = title;
    this.suggestContent = content;
}

function NullSuggest() {
    this.suggestId = -1;
}

module.exports = BdgSuggest;