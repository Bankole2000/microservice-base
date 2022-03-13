export const emailJobsHandler = async (message: any, channel: any) => {
  const messageContent = JSON.parse(message.content.toString());
  switch(messageContent.type) {
    case 'TEST':
      console.log('Auth Service - handling Email Service EX job TEST case', {messageContent})
      channel.ack(message);
      break;
    default:
      console.log('from Auth Service - handling Email Service exchange job', {messageContent})
      break;
  }
}