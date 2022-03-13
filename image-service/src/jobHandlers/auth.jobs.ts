export const authJobsHandler = async (message: any, channel: any) => {
  const messageContent = JSON.parse(message.content.toString());
  switch(messageContent.type) {
    case 'TEST':
      console.log('Image Service - handling Auth Service EX job TEST case', {messageContent})
      channel.ack(message);
      break;
    default:
      console.log('from Image Service - handling Auth Service exchange job', {messageContent})
      break;
  }
}