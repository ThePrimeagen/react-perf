var React = require('react');
var renderToString = require('react-dom/server').renderToString;

var Bottom = React.createClass({
    render: function() {
        var index = this.props.index;
        return (<div holla='world'>{index}</div>);
    }
});

var Middle = React.createClass({
    render: function() {
        var a = [];
        for (var i = 0; i < 100; ++i) {
            a[i] = (<Bottom index={i} />);
        }
        return (<div>{a}</div>);
    }
});

var lettering = 'abcdefghijklmnopqrstuvwxyz';
function createRandomWord() {

    // 4 - 13 length long words
    const length = 3 + Math.ceil(Math.random() * 10);
    var word = '';
    for (var i = 0; i < length; ++i) {
        const letter = lettering[Math.floor(Math.random() * lettering.length)];
        word += letter;
    }

    return word;
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}


var words = [];
var wordIndex = 0;
while (wordIndex < 1000) {
    words[wordIndex] = createRandomWord();
    wordIndex++;
}

var Top = React.createClass({
    getInitialState: function() {
        return { };
    },

    componentWillMount: function() {
        var count = this.props.count;
        var state = {};
        for (var i = 0; i < count; ++i) {
            state[getRandomWord()] = getRandomWord();
        }

        this.setState(state);
    },

    render: function() {
        var a = [];
        for (var i = 0; i < this.props.elCount; ++i) {
            a[i] = (<Middle
                {...this.state}
                index={i}>
            </Middle>);
        }
        return (<div>{a}</div>);
    }
});

module.exports = function render(elCount, propCount) {
    return renderToString(<Top elCount={elCount} propCount={propCount} />);
};
