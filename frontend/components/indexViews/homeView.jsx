var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var ApiActions = require('../../actions/apiActions.js');
var PoemStore = require('../../stores/poemStore.js');
var Poem = require('../singlePoem/poem.jsx');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  getInitialState: function () {
    return { poems: PoemStore.all(), page: 1, morePoems: true};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    this.loadNextPage();
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    var updatedPeomsList = PoemStore.all();
    this.setState({poems: updatedPeomsList});
  },
  loadNextPage: function (){
    // Home view
    ApiUtil.getAllPoems(this.state.page);
    this.setState({page: this.state.page+1 });
  },
  render: function () {
    var poems = this.state.poems;
    return(
      <div className="index">
        <h2 className="transperent">.</h2>
        <PoemsDisplay poems={poems}
          currentUser={this.props.currentUser}
          loadNextPage={this.loadNextPage}
          morePoems={this.state.morePoems}
          parent="homeView"
          toggleShowLogin={this.props.toggleShowLogin}/>
      </div>
    );
  }
});
