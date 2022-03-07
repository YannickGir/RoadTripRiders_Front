export default function (
  userData = {
    avatar:
      'https://res.cloudinary.com/la-capsule-batch-49/image/upload/v1646668605/kisspng-memoji-pile-of-poo-emoji-sticker-smiley-user-avatars-5ae24b6a0ff6a1.1779418215247798820654_nukosr.png',
    username: '',
  },
  action
) {
  if (action.type == 'saveUserData') {
    console.log('USER DATA REDUCER', action);
    return action.userData;
  } else {
    return userData;
  }
}
