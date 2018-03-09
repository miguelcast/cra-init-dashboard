import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ str }) => {
  return <div>HOME {str}</div>;
};

Home.propTypes = {
  str: PropTypes.string,
};

const mapStateToProps = state => ({
  str: state.home,
});

export default connect(mapStateToProps)(Home);
