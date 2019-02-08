import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Title } from '../components/Shared';

const Home = ({ str }) => {
  return (
    <div>
      <Title text="Home" />
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
