export const checkBlocked = (otherUserId: any, blockedUsers: [string]) => {
  return blockedUsers.includes(otherUserId);
};
