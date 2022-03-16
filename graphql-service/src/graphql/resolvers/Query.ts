module.exports = {
  hello:  async () => {
    return "Hello There From Query"
  },
  dataHello:async (_, __, {dataSources}, ___) => {
    return await dataSources.testAPI.getTestAPI()
  }
}