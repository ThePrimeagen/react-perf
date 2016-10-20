'use strict';

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

var Top = React.createClass({
    getInitialState: function getInitialState() {
        return {
            things: [],
            that: [],
            make: [],
            me: {},
            happy: {}
        };
    },

    componentWillMount: function componentWillMount() {
        var item;
        for (var i = 0; i < this.props.count; ++i) {
            var rand = Math.floor(Math.random() * 5);
            switch (rand) {
                case 1:
                    item = this.state.things;
                    item.push('rand' + i);
                    this.makeMyState(item);
                    break;
                case 2:
                    item = this.state.that;
                    item.push('rand' + i);
                    this.makeMyState(0, item);
                    break;
                case 3:
                    item = this.state.make;
                    item.push('rand' + i);
                    this.makeMyState(0, 0, item);
                    break;
                case 4:
                    item = this.state.me;
                    item[i] = 'rand' + i;
                    this.makeMyState(0, 0, 0, item);
                    break;
                case 5:
                default:
                    item = this.state.happy;
                    item[i] = 'rand' + i;
                    this.makeMyState(0, 0, 0, 0, item);
                    break;
            }
        }
    },

    makeMyState: function makeMyState(things, that, make, me, happy) {
        if (things) {
            this.setState({ things: things });
        }
        if (that) {
            this.setState({ that: that });
        }
        if (make) {
            this.setState({ make: make });
        }
        if (me) {
            this.setState({ me: me });
        }
        if (happy) {
            this.setState({ happy: happy });
        }
    },

    getValue: function getValue() {
        var state = this.state;
        return state.things.length + state.that.length + state.make.length - Object.keys(this.state.me).length - Object.keys(this.state.happy).length;
    },


    render: function render() {
        var a = [];
        var value = this.getValue();

        if (value < 1) {
            value = 10;
        }

        for (var i = 0; i < 10; ++i) {
            a[i] = React.createElement(Middle, { index: i });
        }
        return React.createElement(
            'div',
            null,
            a
        );
    }
});

module.exports = function render(i) {
    return renderToString(React.createElement(Top, { count: i }));
};

