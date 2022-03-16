import { DataSource } from 'apollo-datasource';

class TestAPI extends DataSource {
  constructor(){
    super();
  }
  async getTestAPI(){
    return {
      message: "Hello Test API"
    }
  }

  async getTestAPIFromParam(param:string) {
    return {
      message: param
    }
  }
}

module.exports = TestAPI
