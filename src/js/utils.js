const ua = window.navigator.userAgent.toLowerCase();
const isMobile = /mobile/i.test(ua);
const browser = {};
const os = {};
const phone = {};

const d = {
    android_1: /android[\s/]([\d.]+)/i,
    android_2: /android/i,
    android_3: /MIDP-/i,
    ipod_1: /iPod\stouch;\sCPU\siPhone\sos\s([\d_]+)/i,
    ipod_100: /iPod.*os\s?([\d_.]+)/i,
    iphone: /iPhone;\sCPU\siPhone\sos\s([\d_]+)/i,
    iphone_100: /iPhone.*os\s?([\d_.]+)/i,
    ipad_1: /ipad;\scpu\sos\s([\d_]+)/i,
    ipad_2: /ipad([\d]+)?/i,
    windows: /windows\snt\s([\d.]+)/i,
    mac: /Macintosh.*mac\sos\sx\s([\d_.]+)/i,
    linux: /Linux/i
};
for (let e in d) {
    let b = d[e].exec(ua);
    if (b) {
        let c = e.replace(/_\d+/, "");
        os[c] = !0;
        os.name = c;
        b[1] && (os.version = b[1].replace(/_/g, "."));
        break;
    }
}
(os.iphone ||os.ipad || os.ipod) && (os.ios = !0);

const h = {
    wechat: /MicroMessenger\/([\d.]+)/i,
    ipadqq: /IPadQQ\/([\d.]+)/i,
    mqq: /qq\/([\d.]+)/i,
    qzone: /QZONEJSSDK\/([\d.]+)/i,
    mqqbrowser: /mqqbrowser\/([\d.]+)/i,
    qqbrowser: /[^m]QQBrowser\/([\d.]+)/i,
    x5: /tbs\/(\d+)/i,
    uc: /UCBrowser\/([\d.]+)/i,
    safari_1: /Version\/(([\d.]+))\sSafari\/[\d.]+/i,
    safari_2: /Safari\/([\d.]+)/i,
    firefox: /Firefox\/([\d.]+)/i,
    opera: /OPR\/([\d.]+)/i,
    ie_1: /MSIE\s([\d.]+)/i,
    ie_2: /(trident\/\d.\d)/i,
    ie_3: /(Edge)\/\d+.\d+/i,
    weibo: /weibo__([\d.]+)/i,
    qqnews: /qqnews\/([\d.]+)/i,
    qqlive_1: /QQLiveBrowser\/([\d.]+)/i,
    qqlive_2: /QQLiveHDBrowser\/([\d.]+)/i,
    kuaibao: /qnreading\/([\d.]+)/i,
    liebao: /LieBaoFast\/([\d.]+)/i,
    douban: /com.douban.frodo\/([\d.]+)/i,
    miuibrowser: /MiuiBrowser/i,
    baidu: /baiduboxapp/i,
    browser360: /360browser/i,
    oppobrowser: /OppoBrowser/i,
    chrome_1: /CriOS\/([\d.]+)/i,
    chrome_2: /Chrome\/([\d.]+)/i,
    qqdownloader: /qqdownloader\/([\d.]+)/i
};
for (let i in h) {
    let f = f = h[i].exec(ua);
    if (f) {
        let g = i.replace(/_\d+/, "");
        if (browser[g]) break;
        browser[g] = {
            version: f[1]
        };
    }
}
os.android && browser.safari && delete browser.safari;
browser.chrome && browser.safari && delete browser.safari;
browser.ie && browser.ie.version && browser.ie.version.indexOf("trident") > -1 && (browser.ie.version.indexOf("6.0") > -1 ? browser.ie.version = "10": browser.ie.version.indexOf("5.0") > -1 ? browser.ie.version = "9": browser.ie.version.indexOf("4.0") > -1 ? browser.ie.version = "8": browser.ie.version = "11");
const k = {
    ipod: /iPod/i,
    ipad: /iPad/i,
    iphone: /iPhone/i,
    huawei_1: /HUAWEI([\w_-]+)/i,
    huawei_2: /(CHM-\w+)/i,
    huawei_3: /(HonorChe)/i,
    huawei_4: /HONORPLK/i,
    huawei_5: /(Che\d+-CL\d+)/i,
    huawei_6: /(H\d+-L\d+)/i,
    huawei_100: /HUAWEI/i,
    xiaomi_1: /(HM\sNOTE)/i,
    xiaomi_2: /(HM\s\w+)/i,
    xiaomi_3: /(MI\s\w+)/i,
    xiaomi_4: /(MI-ONE\sPlus)/i,
    xiaomi_5: /(M1)\sBuild/i,
    xiaomi_6: /(HM\d+)/i,
    xiaomi_7: /Xiaomi[\s_]?([\w_]+)/i,
    samsung_1: /(GT-\w+)/i,
    samsung_2: /(SCH-\w+)/i,
    samsung_3: /(SM-\w+)/i,
    vivo: /vivo\s(\w+)/i,
    oneplus: /ONEPLUS-([a-z0-9]+)/i,
    lenovo_1: /Lenovo[\s-]?([\w-]+)/i,
    lenovo_100: /Lenovo/i,
    zte_1: /ZTE\s?(\w+)?/i,
    zte_2: /ZTE/i,
    coolpad_1: /Coolpad\s(\w+)/i,
    coolpad_100: /Coolpad/i,
    oppo_1: /OPPO\s?(\w+)/i,
    oppo_2: /(R7Plus|R8007|R801|R831S|R8205)/i,
    oppo_100: /OPPO/i,
    meizu_1: /(MX\d+)/i,
    meizu_2: /(m\d+\snote)\sBuild/i,
    htc_1: /HTC\s?(\w+)/i,
    htc_100: /HTC/i,
    tcl: /TCL\s(\w+)/i,
    lephone: /lephone\s(\w+)/i,
    lg: /LG[\s-]?(\w+)/i,
    galaxy: /(galaxy\d+)/,
    hisense_1: /Hisense/i,
    hisense_2: /HS-(\w+)/i,
    philips: /Philips\s?(\w+)?/i,
    "金立": /(GN\w+)\sBuild/i,
    sonny: /sonny/i,
    "天语": /K-Touch/i
};
for (let l in k){
    let j = k[l].exec(ua);
    if (j) {
        phone.name = l.replace(/_\d+/, "");
        j[1] && (phone.version = j[1].replace(/^[_-]/gi, ""));
        break;
    }
}

const compareVersion=(a, b)=>{
    a = String(a).split(".");
    b = String(b).split(".");
    try {
        for (let c = 0,d = Math.max(a.length, b.length); c < d; c++) {
            let e = isFinite(a[c]) && Number(a[c]) || 0,
                f = isFinite(b[c]) && Number(b[c]) || 0;
            if (e < f) return - 1;
            if (e > f) return 1
        }
    } catch(g) {
        return - 1;
    }
    return 0;
};

const  isSupportH5=()=> {
    return !! (browser.firefox && compareVersion(browser.firefox.version, "48.0") >= 0 ) || !(browser.opera && compareVersion(browser.opera.version, "40.0") < 0) && (browser.chrome && compareVersion(browser.chrome.version, "40.0") >= 0);
};
const isSupportMP4=()=> {
    const a = document.createElement("video");
    return "function" == typeof a.canPlayType && ("probably" == a.canPlayType('video/mp4; codecs="avc1.42E01E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.58A01E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.4D401E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.64001E"'))
};

const  getDevicePlayer = () =>{
    return os.mac ? browser.safari && (compareVersion(browser.safari.version, "9.0") < 0 || compareVersion(os.version, "10.10") < 0) ? "flash": browser.firefox && compareVersion(browser.firefox.version, "48.0") < 0 ? "flash": isSupportMP4() ? "html5hd": "flash": os.windows ? isSupportH5() && isSupportMP4() ? "html5hd": "flash": os.linux ? "flash": os.ios ? os.ipad ? "ipadh5": "h5": os.android ? isSupportMP4() ? "h5": "mp4link": "flash";
};

const utils = {

    /**
    * Parse second to time string
    *
    * @param {Number} second
    * @return {String} 00:00 or 00:00:00
    */
    secondToTime: (second) => {
        const add0 = (num) => num < 10 ? '0' + num : '' + num;
        const hour = Math.floor(second / 3600);
        const min = Math.floor((second - hour * 3600) / 60);
        const sec = Math.floor(second - hour * 3600 - min * 60);
        return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
    },

    /**
     * control play progress
     */
    // get element's view position
    getElementViewLeft: (element) => {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent;
        const elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        }
        else {
            while (current !== null && current !== element) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        }
        return actualLeft - elementScrollLeft;
    },

    getScrollPosition () {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        };
    },

    setScrollPosition ({left = 0, top = 0}) {
        if (this.isFirefox) {
            document.documentElement.scrollLeft = left;
            document.documentElement.scrollTop = top;
        }
        else {
            window.scrollTo(left, top);
        }
    },

    isMobile: isMobile,

    isFirefox: /firefox/i.test(window.navigator.userAgent),

    isChrome: /chrome/i.test(window.navigator.userAgent),
    getDevicePlayer(){return getDevicePlayer();},
    storage: {
        set: (key, value) => {
            localStorage.setItem(key, value);
        },

        get: (key) => localStorage.getItem(key)
    },

    cumulativeOffset: (element) => {
        let top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return {
            top: top,
            left: left
        };
    },

    nameMap: {
        dragStart: isMobile ? 'touchstart' : 'mousedown',
        dragMove: isMobile ? 'touchmove' : 'mousemove',
        dragEnd: isMobile ? 'touchend' : 'mouseup'
    }
};

export default utils;