
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

angular.module('restoApp.services')

.factory('XSRFInterceptor', function() {
    var XSRFInterceptor = {
        request: function(config) {
            var token = readCookie('XSRF-TOKEN');
            if (token) {
                config.headers['X-XSRF-TOKEN'] = token;
            }
            return config;
        }
    };
    return XSRFInterceptor;
});