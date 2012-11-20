var exports = {};

export module Yardstick {

    export class Client {

        private _apiKey: string;

        constructor (apiKey: string, options?: IOptions) {
            if (typeof (apiKey) == undefined) {
                throw ("You must provide your yardstick API key");
            }
            if (typeof options === 'undefined') { options = {}; }
            if (options.ssl && options.ssl !== true) { options.ssl = false; }

            this._apiKey = apiKey;
        }

        track(metric: IMetric, callback?: () => void ) {

            var yardstick_headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "yardstick/1.0.0 (YardstickTypescript)",
                "X-Yardstick-Token": this._apiKey
            }

            var req = new XMLHttpRequest();
            req.open("POST", "http://api.yardstick.it/metric", true);

            for (var h in yardstick_headers) {
                req.setRequestHeader(h, yardstick_headers[h]);
            }

            req.onreadystatechange = function () {
                if (req.readyState != 4 || req.status != 200) return;
                //req.responseText
            };
            req.send(metric);
        }
    }

    export interface IMetric {
        name: string;
        category: string;
    }

    export interface IOptions {
        ssl?: bool;
    }
}