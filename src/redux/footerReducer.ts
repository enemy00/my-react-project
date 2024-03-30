const initial = {
    socials: []
}
type InitialType = typeof initial
const footerReducer = (state = initial, action: any): InitialType => {
    switch (action.type) {
        default:
            return state;
    }
}


export default footerReducer;

