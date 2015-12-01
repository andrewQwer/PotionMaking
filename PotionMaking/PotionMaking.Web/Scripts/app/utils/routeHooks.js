var TokenStore = require('../stores/TokenStore');

var hooks = {
    checkRegistrationToken: function (nextState, replaceState) {
        var token = nextState.location.query.rt;
        var lastRegToken = TokenStore.getLastRegistrationToken();
        if (token !== lastRegToken) {
            replaceState(null, '/register')
        } else {
            TokenStore.clearRegistrationToken();
        }
    },
    checkAuthorized: function (nextState, replaceState) {
        var token = TokenStore.getAuthToken();
        if (!token) {
            replaceState({ nextPathname: nextState.location.pathname }, '/login')
        }
    },
    logout: function (nextState, replaceState) {
        TokenStore.clearAuthToken();
        replaceState(null, '/login')
    }
}
module.exports = hooks;
