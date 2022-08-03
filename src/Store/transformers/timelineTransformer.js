import { unixTimeToReadableFormat } from "../../Common/helperFns";

export const transformTimeLineResponse = (timelineRes)=>{
    let trnsformedResponse = [];
    const { timelineImages, imagePrefixUrl } = timelineRes;
    timelineImages.map(res=>{
        const { userName, image, postedOn, ...restDetails } = res;
        let imageLink = `${imagePrefixUrl}/${userName}/${image}`;
        let postedDate = unixTimeToReadableFormat(postedOn);
        let imageName = image.split('.jpg').join('').split('jpeg').join('').split('png')[0];
        
        let transformedRes = {
            userName,
            image,
            postedOn,
            imageLink,
            postedDate,
            imageName,
            ...restDetails
        };
        trnsformedResponse.push(transformedRes);
    });

    return { trnsformedResponse };
}