export const didCurrentUserLiked = (likedByArr = []) => {
  let currentUser = JSON.parse(localStorage.getItem("userInfo")).userName;
  if (likedByArr.some(({ user }) => user === currentUser)) return true;
  else return false;
};
