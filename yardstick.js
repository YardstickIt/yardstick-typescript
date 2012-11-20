var exports = {
};
(function (Yardstick) {
    var Client = (function () {
        function Client(apiKey, options) {
            if(typeof (apiKey) == undefined) {
                throw ("You must provide your yardstick API key");
            }
            if(typeof options === 'undefined') {
                options = {
                };
            }
            if(options.ssl && options.ssl !== true) {
                options.ssl = false;
            }
            this._apiKey = apiKey;
        }
        Client.prototype.track = function (metric, callback) {
            var yardstick_headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "yardstick/1.0.0 (YardstickTypescript)",
                "X-Yardstick-Token": this._apiKey
            };
            var req = new XMLHttpRequest();
            req.open("POST", "http://api.yardstick.it/metric", true);
            for(var h in yardstick_headers) {
                req.setRequestHeader(h, yardstick_headers[h]);
            }
            req.onreadystatechange = function () {
                if(req.readyState != 4 || req.status != 200) {
                    return;
                }
            };
            req.send(metric);
        };
        return Client;
    })();
    Yardstick.Client = Client;    
})(exports.Yardstick || (exports.Yardstick = {}));


