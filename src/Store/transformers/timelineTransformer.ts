/* eslint-disable no-underscore-dangle */
import { currentUser, unixTimeToReadableFormat } from '../../Common/helperFns';

export const transformTimeLineResponse = (
  timelineRes: TimeLineImgApiRes
): { trnsformedResponse: TransformedTimelineImgRes[] } => {
  const trnsformedResponse: TransformedTimelineImgRes[] = [];
  const { timelineImages, imagePrefixUrl } = timelineRes;
  timelineImages.forEach((res) => {
    const { userName, image, postedOn, ...restDetails } = res;
    const imageLink = `${imagePrefixUrl}/${userName}/${image}`;
    const postedDate = unixTimeToReadableFormat(postedOn);
    const imageName = image
      .split('.jpg')
      .join('')
      .split('jpeg')
      .join('')
      .split('png')[0];

    const transformedRes = {
      userName,
      image,
      postedOn,
      imageLink,
      postedDate,
      imageName,
      ...restDetails,
    };
    trnsformedResponse.push(transformedRes);
  });

  return { trnsformedResponse };
};

export const updateLikeCountTransformer = (
  allImages: TransformedTimelineImgRes[],
  affectedImage: TimelineImages,
  likeType: string
): { allTimelineImages: TransformedTimelineImgRes[] } => {
  const allTimelineImages = [...allImages];
  const { image: affectedImg, userName: affectedName } = affectedImage;
  const affectedPost = allTimelineImages.find(
    ({ image, userName }) => image === affectedImg && userName === affectedName
  );
  const affectedPostIndex = allTimelineImages.findIndex(
    ({ image, userName }) => image === affectedImg && userName === affectedName
  );

  if (affectedPost !== undefined && affectedPost !== null) {
    const currentCount = parseInt(affectedPost?.likes, 10);
    const likes =
      likeType === 'INCREMENT' ? `${currentCount + 1}` : `${currentCount - 1}`;
    const likedBy =
      likeType === 'INCREMENT'
        ? [
            ...affectedPost.likedBy,
            {
              user: currentUser(),
              likedOn: Math.round(new Date().getTime() / 1000),
            },
          ]
        : affectedPost.likedBy.filter(({ user }) => user !== currentUser());
    const updateAffectedPost = {
      ...affectedPost,
      likes,
      likedBy,
    };
    allTimelineImages.splice(affectedPostIndex, 1, updateAffectedPost);
  }
  return { allTimelineImages };
};

export const updateCommentTransformer = (
  allImages: TransformedTimelineImgRes[],
  commentedImgDetail: TimelineImages,
  comment: string
): TransformedTimelineImgRes[] => {
  const updatedTimelineImgs = [...allImages];
  const commentedImg = updatedTimelineImgs.find(
    ({ _id }) => commentedImgDetail._id === _id
  );
  const commentedImgIndex = updatedTimelineImgs.findIndex(
    ({ _id }) => commentedImgDetail._id === _id
  );

  if (commentedImg != null && commentedImg !== undefined) {
    const updatedImg = {
      ...commentedImg,
      commentSection: [
        ...commentedImg.commentSection,
        {
          comment,
          commentedOn: Math.round(new Date().getTime() / 1000),
          userName: currentUser(),
        },
      ],
    };
    updatedTimelineImgs.splice(commentedImgIndex, 1, updatedImg);
  }

  return updatedTimelineImgs;
};
