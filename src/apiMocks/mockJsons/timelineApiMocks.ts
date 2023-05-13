export const GetTimelineApiRes = {
  timelineImages: [
    {
      _id: '642254a919c15013800356e6',
      userName: 'Seenu',
      image: 'IMG_20180224_163511742.jpg',
      postedOn: 1679971497,
      likes: '2',
      likedBy: [
        {
          user: 'Seenu',
          likedOn: 1679985022,
        },
        {
          user: 'araosDev',
          likedOn: 1680150164,
        },
      ],
      caption: 'Some crazy shit',
      commentSection: [
        {
          userName: 'Seenu',
          comment: 'Crazy times, uh?',
          commentedOn: 1679985037,
        },
        {
          userName: 'araosDev',
          comment:
            "The hashtag in the Katrina's poster seems intentional, uh? :D",
          commentedOn: 1680150284,
        },
      ],
    },
  ],
  imagePrefixUrl:
    'https://storage.googleapis.com/araosdev-social-media.appspot.com',
};

export const postImageAPIRes = { status: 'UPLOADED' };

export const searchFrndsAPIRes = { status: 'OK', filteredUsers: ['araosDev'] };
export const searchFrndsAPIErr = { status: 'NO_USERS_FOUND_FOR_THIS_KEYWORD' };
