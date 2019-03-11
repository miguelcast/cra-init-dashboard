import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Title } from '../components/Shared';

const About = () => {
  return (
    <div>
      <Title text="About" />
      <Link to="/">
        <Button htmlType="button" icon="home" type="primary" size="large">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default About;
