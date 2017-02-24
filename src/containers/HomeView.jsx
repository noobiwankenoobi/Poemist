import React from 'react';
import { connect } from 'react-redux';
import { getIndexPoems } from 'src/actions/ajax/poem';
import { values } from 'lodash';
import IndexView from 'src/containers/IndexView.jsx';

class HomeView extends React.Component {
  render() {
    const { poems, getIndexPoems, allPoemsLoaded } = this.props;
    return (
      <div className="index-view">
        <h5>Browse through all the communitys poems!</h5>
        <IndexView
          poems={poems}
          getMorePoems={getIndexPoems}
          allPoemsLoaded={allPoemsLoaded}
        />
      </div>
    );
  }
}

HomeView.propTypes = {
  poems: React.PropTypes.array,
  getIndexPoems: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
};

const mapDispatchToProps = {
  getIndexPoems,
};

function mapStateToProps(state) {
  return {
    poems: values(state.poems),
    allPoemsLoaded: state.current.allPoemsLoaded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);