import { authJobsHandler } from "./auth.jobs";
import { emailJobsHandler } from "./email.jobs";
import { imageJobsHandler } from "./image.jobs";
import { userJobsHandler } from "./user.jobs";


export const exchangeJobsHandlers = async (message: any, channel: any) => {
  const messageContent = JSON.parse(message.content.toString());
  
  switch(messageContent.origin) {
    case 'email-service':
      await emailJobsHandler(message, channel);
      break;
    case 'auth-service':
      await authJobsHandler(message, channel);
      break;
    case 'user-service':
      await userJobsHandler(message, channel);
      break;
    case 'image-service':
      await imageJobsHandler(message, channel);
      break;
    default:
  }
}