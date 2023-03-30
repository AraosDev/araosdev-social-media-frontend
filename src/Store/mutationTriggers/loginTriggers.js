export const getLoggedInUserInfo = (trigger, reqBody, captureTriggerStatus) => {
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      const { credentialsVerified: isVerified, status } = res;
      if (isVerified === 'OK' && status === 200) {
        captureTriggerStatus('SUCCESS');
      }
    })
    .catch(() => captureTriggerStatus('ERROR'));
};

export const createUserAccount = (trigger, reqBody, captureTriggerStatus) => {
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      if (res.status === 400 && res.updated === 'FAILED') {
        captureTriggerStatus('ERROR_VIEW', res.message.toUpperCase());
      } else if (res.status === 200 && res.updated === 'OK') {
        captureTriggerStatus('ACCOUNT_CREATED');
      }
    })
    .catch(() => captureTriggerStatus('ERROR_VIEW'));
};
