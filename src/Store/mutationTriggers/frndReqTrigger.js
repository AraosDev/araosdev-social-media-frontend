/* eslint-disable import/prefer-default-export */
export const friendRequestTrigger = (
  trigger,
  reqBody,
  captureTriggerStatus
) => {
  const { event, ...restReqBody } = reqBody;
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(restReqBody)
    .unwrap()
    .then((res) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (captureTriggerStatus) captureTriggerStatus(res);
    })
    .catch(() => captureTriggerStatus('ERROR'));
};
