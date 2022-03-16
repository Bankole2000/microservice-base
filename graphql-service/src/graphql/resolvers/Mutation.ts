module.exports = {
  sayMessage:async (_, {param}, {dataSources}, __) => {
    console.log({param});
    return await dataSources.testAPI.getTestAPIFromParam(param)
  }
}