import axios from 'axios';

class InstanceAxios {
  static _instance = null;

  constructor() {
    const headers = {};

    this._instance = axios.create({
      baseURL: process.env.REACT_APP_API || 'http://localhost:3000',
      headers,
    });
  }

  get instance() {
    return this._instance;
  }
}

const InstAx = new InstanceAxios();

export default InstAx.instance;
