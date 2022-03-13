export const profileJobsHandler = async (message: any, channel: any) => {
  const messageContent = JSON.parse(message.content.toString());
  switch(messageContent.type) {
    case 'TEST':
      console.log('User Service - handling Profile Service EX job TEST case', {messageContent})
      channel.ack(message);
      break;
    default:
      console.log('from User Service - handling Profile Service exchange job', {messageContent})
      break;
  }
}