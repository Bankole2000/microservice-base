export const imageJobsHandler = async (message: any, channel: any) => {
  const messageContent = JSON.parse(message.content.toString());
  switch(messageContent.type) {
    case 'TEST':
      console.log('User Service - handling Image Service EX job TEST case', {messageContent})
      channel.ack(message);
      break;
    default:
      console.log('from User Service - handling Image Service exchange job', {messageContent})
      break;
  }
}