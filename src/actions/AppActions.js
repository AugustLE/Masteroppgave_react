export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}