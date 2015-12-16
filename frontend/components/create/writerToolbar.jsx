var React = require('react');
var History = require('react-router').History;


module.exports = React.createClass({
  mixins: [History],
  goToStyling: function(){
    this.history.pushState(null, "/create/stylize");
  },
  render: function () {
    return(
      <div className="writerToolbar">
        <button onClick={this.goToStyling}>Stylize</button>
      </div>
    );
  }
});