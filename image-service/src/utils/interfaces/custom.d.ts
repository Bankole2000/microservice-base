declare namespace Express {
  export interface Request {
     channel?: any,
     user?: any, 
     redis?: any
  }
}