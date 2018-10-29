import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <Link to="/">
        <Button icon="home" type="primary" size="large">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default About;
