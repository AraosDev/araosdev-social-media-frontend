/* eslint-disable import/prefer-default-export */
export const postImageInTimeline = (trigger, reqBody, captureTriggerStatus) => {
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then(() => {
      if (captureTriggerStatus) captureTriggerStatus('SUCCESS');
    })
    .catch(() => captureTriggerStatus('ERROR'));
};
