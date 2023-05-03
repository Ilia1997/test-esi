export const handle = async ({ event, resolve }) => {
   // resolve event
   const response = await resolve(event);
   return response;
};
