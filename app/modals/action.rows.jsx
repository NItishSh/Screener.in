"use strict";
var React = require('react');
var classNames = require('classnames');
var Icon = require('app/components/icon.jsx');
var Button = require('app/components/button.jsx');


var ActionRows = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    getDisplayName: React.PropTypes.func.isRequired,
    handleRemove: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      removing: [],
      removed: []
    };
  },

  handleRemove: function(idx) {
    var item = this.props.items[idx];
    var name = this.props.getDisplayName(item);
    this.setState({removing: this.state.removing.concat([name])});
    this.props.handleRemove(item).then(function() {
      this.setState({removed: this.state.removed.concat([name])});
    }.bind(this));
  },

  renderItem: function(item, idx) {
    var name = this.props.getDisplayName(item);
    var isRemoving = this.state.removing.indexOf(name) >= 0;
    var isRemoved = this.state.removed.indexOf(name) >= 0;
    var classes = classNames({
      warning: isRemoving,
      danger: isRemoved,
    });
    var action = <a onClick={this.handleRemove.bind(null, idx)}>
      <Icon name="remove" /> Remove
    </a>;
    if(isRemoving)
      action = isRemoved ? 'Removed' : 'Removing...';
    return <tr key={idx} className={classes}>
      <td className="text">{name}</td>
      <td className="text">
        {action}
      </td>
    </tr>;
  },

  render: function() {
    var items = this.props.items;
    var removing = this.state.removing;
    var removed = this.state.removed;
    return <table className="table table-striped">
      <tbody>
        {this.props.items.map(this.renderItem)}
      </tbody>
    </table>;
  }
});

module.exports = ActionRows;