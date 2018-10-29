import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = ({ str }) => {
  return (
    <div>
      <Link to="about">
        <Button type="primary" size="large">
          Go to About
        </Button>
      </Link>{' '}
      {str}
    </div>
  );
};

Home.propTypes = {
  str: PropTypes.string,
};

const mapStateToProps = state => ({
  str: state.home,
});

export default connect(mapStateToProps)(Home);
