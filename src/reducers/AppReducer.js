
const INITIAL_STATE = {
    error: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return { error: true };
        
        case 'ITEMS_HAS_SUCCEEDED':
            return { error: false };
            
        default:
            return state;
    }
}