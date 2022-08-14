import { currentUser, unixTimeToReadableFormat } from "../../Common/helperFns";

export const transformTimeLineResponse = (timelineRes) => {
  let trnsformedResponse = [];
  const { timelineImages, imagePrefixUrl } = timelineRes;
  timelineImages.map((res) => {
    const { userName, image, postedOn, ...restDetails } = res;
    let imageLink = `${imagePrefixUrl}/${userName}/${image}`;
    let postedDate = unixTimeToReadableFormat(postedOn);
    let imageName = image
      .split(".jpg")
      .join("")
      .split("jpeg")
      .join("")
      .split("png")[0];

    let transformedRes = {
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
  allImages,
  affectedImage,
  likeType
) => {
  let allTimelineImages = [...allImages];
  const { image: affectedImg, userName: affectedName } = affectedImage;
  const affectedPost = allTimelineImages.find(
    ({ image, userName }) => image === affectedImg && userName === affectedName
  );
  const affectedPostIndex = allTimelineImages.findIndex(
    ({ image, userName }) => image === affectedImg && userName === affectedName
  );
  let currentCount = parseInt(affectedPost.likes);
  let likes =
    likeType === "INCREMENT" ? `${currentCount + 1}` : `${currentCount - 1}`;
  let likedBy =
    likeType === "INCREMENT"
      ? [
          ...affectedPost.likedBy,
          {
            user: currentUser(),
            likedOn: Math.round(new Date().getTime() / 1000),
          },
        ]
      : affectedPost.likedBy.filter(({ user }) => user !== currentUser());
  let updateAffectedPost = {
    ...affectedPost,
    likes,
    likedBy,
  };
  allTimelineImages.splice(affectedPostIndex, 1, updateAffectedPost);
  return { allTimelineImages };
};

export const updateCommentTransformer = (
  allImages,
  commentedImgDetail,
  comment
) => {
  let updatedTimelineImgs = [...allImages];
  const commentedImg = updatedTimelineImgs.find(
    ({ _id }) => commentedImgDetail._id === _id
  );
  const commentedImgIndex = updatedTimelineImgs.findIndex(
    ({ _id }) => commentedImgDetail._id === _id
  );
  let updatedImg = {
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

  return updatedTimelineImgs;
};
