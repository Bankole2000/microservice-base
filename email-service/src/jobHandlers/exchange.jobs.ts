import { authJobsHandler } from "./auth.jobs";
import { imageJobsHandler } from "./image.jobs";
import { profileJobsHandler } from "./profile.jobs";
import { userJobsHandler } from "./user.jobs";

export const exchangeJobsHandlers = async (message: any, channel: any) => {
  const messageContent = JSON.parse(message.content.toString());
  
  switch(messageContent.origin) {
    case 'auth-service':
      await authJobsHandler(message, channel);
      break;
    case 'profile-service':
      await profileJobsHandler(message, channel);
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