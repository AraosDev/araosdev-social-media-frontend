const initialState = {
    timelineImages: [],
    timelineState: ''
};

const timelineReducer = (state = initialState, action) => {
    let newState = {...state};

    switch(action.type) {
        case 'SET_TIMELINE': {
            newState.timelineImages = action.payload.images;
            newState.timelineState = action.payload.state;
            break;
        }

        default: {
            newState = {...state};
            break;
        }
    }

    return newState;
}

export default timelineReducer;