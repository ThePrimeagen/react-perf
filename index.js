'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var renderToString = require('react-dom/server').renderToString;

var Bottom = React.createClass({
    render: function render() {
        var index = this.props.index;
        return React.createElement(
            'div',
            { holla: 'world' },
            index
        );
    }
});

var Middle = React.createClass({
    render: function render() {
        var a = [];
        for (var i = 0; i < 100; ++i) {
            a[i] = React.createElement(Bottom, { index: i });
        }
        return React.createElement(
            'div',
            null,
            a
        );
    }
});

var lettering = 'abcdefghijklmnopqrstuvwxyz';
function createRandomWord() {

    // 4 - 13 length long words
    var length = 3 + Math.ceil(Math.random() * 10);
    var word = '';
    for (var i = 0; i < length; ++i) {
        var letter = lettering[Math.floor(Math.random() * lettering.length)];
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
    getInitialState: function getInitialState() {
        return {};
    },

    componentWillMount: function componentWillMount() {
        var count = this.props.count;
        var state = {};
        for (var i = 0; i < count; ++i) {
            state[getRandomWord()] = getRandomWord();
        }

        this.setState(state);
    },

    render: function render() {
        var a = [];
        for (var i = 0; i < this.props.elCount; ++i) {
            a[i] = React.createElement(Middle, _extends({}, this.state, {
                index: i }));
        }
        return React.createElement(
            'div',
            null,
            a
        );
    }
});

module.exports = function render(elCount, propCount) {
    return renderToString(React.createElement(Top, { elCount: elCount, propCount: propCount }));
};
