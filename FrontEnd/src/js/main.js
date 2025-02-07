function leerCookie(nombre_cookie) {
    // Obtener un array con el nombre y valor de una cookie guardados como cadena, en cada posiciÃ³n:
    var aCookies = document.cookie.split(";");
    // Variables auxiliares:
    var contador;
    var posicionSignoIgual;
    var nombreCookie;
    var valorCookie;
    for (contador = 0; contador < aCookies.length; contador++) {
        // Obtenemos la posiciÃ³n en la que estÃ¡ el signo igual
        // No lo ponemos fuera del bucle porque los nombres puede que no tengan la misma longitud
        posicionSignoIgual = aCookies[contador].indexOf("=");
        // Obtenemos el nombre de la Cookie, eliminando espacios
        nombreCookie = aCookies[contador]
            .substring(0, posicionSignoIgual)
            .replace(" ", "");
        if (nombreCookie == nombre_cookie) {
            // AÃ±adimos 1 'posicionSignoIgual' porque con substring() las posiciones de la cadena comienzan desde cero:
            valorCookie = aCookies[contador].substring(posicionSignoIgual + 1);
        }
    }
    return valorCookie;
}

var userID = leerCookie("DeusID_GTM");

if (!userID) {
    userID = "";
}

dataLayer.push({
    event: "pagina cargada",
    campus: "Campus Bilbao,Campus San Sebastian,Sede Vitoria-Gasteiz",
    facultad: "Deusto Business School",
    tipologia: "Executive",
    subtipologia: "",
    area: "Empresa",
    nombre: "Programa Generacion Digital Pymes",
    modalidad: "Semipresencial",
    idioma: "es",
    userID: "" + userID + "",
});
document.addEventListener("scroll", zopimlaunch);
document.addEventListener("mousedown", zopimlaunch);
document.addEventListener("mousemove", zopimlaunch);
document.addEventListener("touchstart", zopimlaunch);
document.addEventListener("keydown", zopimlaunch);

function zopimlaunch() {
    window.$zopim ||
        (function (d, s) {
            var z = ($zopim = function (c) {
                z._.push(c);
            }),
                $ = (z.s = d.createElement(s)),
                e = d.getElementsByTagName(s)[0];
            z.set = function (o) {
                z.set._.push(o);
            };
            z._ = [];
            z.set._ = [];
            $.async = !0;
            $.setAttribute("charset", "utf-8");
            $.src = "//v2.zopim.com/?3MSL5gJGTcIZOyeJBifR98aqaNA6imP4";
            z.t = +new Date();
            $.type = "text/javascript";
            e.parentNode.insertBefore($, e);
        })(document, "script");

    document.removeEventListener("scroll", zopimlaunch);
    document.removeEventListener("mousedown", zopimlaunch);
    document.removeEventListener("mousemove", zopimlaunch);
    document.removeEventListener("touchstart", zopimlaunch);
    document.removeEventListener("keydown", zopimlaunch);
}

if (typeof $zopim !== "undefined") {
    $zopim(function () {
        $zopim.livechat.setLanguage("es");

        $zopim.livechat.departments.setVisitorDepartment(
            "Deusto Business School"
        );
        $zopim.livechat.setOnConnected(function () {
            var dept = $zopim.livechat.departments.getDepartment(
                "Deusto Business School"
            );
            /*console.log(dept);
                                            console.log(dept.status);*/
            if (dept.status == "offline") {
                $zopim.livechat.setStatus("offline");
            }
        });
    });
}
var d = new Date();
d.setTime(d.getTime() + 31104e6);
var expires = "expires\x3d" + d.toUTCString(),
    domain = " domain\x3d.deusto.es",
    path = " path\x3d/";
document.cookie =
    "visitortype\x3dqualified;; " + expires + "; " + domain + "; " + path;
!(function (d, g, e) {
    d.TiktokAnalyticsObject = e;
    var a = (d[e] = d[e] || []);
    a.methods =
        "page track identify instances debug on off once ready alias group enableCookie disableCookie".split(
            " "
        );
    a.setAndDefer = function (b, c) {
        b[c] = function () {
            b.push([c].concat(Array.prototype.slice.call(arguments, 0)));
        };
    };
    for (d = 0; d < a.methods.length; d++) a.setAndDefer(a, a.methods[d]);
    a.instance = function (b) {
        b = a._i[b] || [];
        for (var c = 0; c < a.methods.length; c++)
            a.setAndDefer(b, a.methods[c]);
        return b;
    };
    a.load = function (b, c) {
        var f = "https://analytics.tiktok.com/i18n/pixel/events.js";
        a._i = a._i || {};
        a._i[b] = [];
        a._i[b]._u = f;
        a._t = a._t || {};
        a._t[b] = +new Date();
        a._o = a._o || {};
        a._o[b] = c || {};
        c = document.createElement("script");
        c.type = "text/javascript";
        c.async = !0;
        c.src = f + "?sdkid\x3d" + b + "\x26lib\x3d" + e;
        b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(c, b);
    };
    a.load("CJRFRO3C77U2Q32CC6F0");
    a.page();
})(window, document, "ttq");
for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;)
    /youtube.com\/embed/.test(e[x].src) &&
        -1 === e[x].src.indexOf("enablejsapi\x3d") &&
        (e[x].src +=
            (-1 === e[x].src.indexOf("?") ? "?" : "\x26") + "enablejsapi\x3d1");
var gtmYTListeners = [];
function onYouTubeIframeAPIReady() {
    for (
        var a = document.getElementsByTagName("iframe"), b = a.length;
        b--;

    )
        /youtube.com\/embed/.test(a[b].src) &&
            (gtmYTListeners.push(
                new YT.Player(a[b], {
                    events: {
                        onStateChange: onPlayerStateChange,
                        onError: onPlayerError,
                    },
                })
            ),
                (YT.gtmLastAction = "p"));
}
function onPlayerStateChange(a) {
    a.data == YT.PlayerState.PLAYING &&
        setTimeout(onPlayerPercent, 1e3, a.target);
    var b = a.target.getVideoData();
    b = b.video_id + ":" + b.title;
    a.data == YT.PlayerState.PLAYING &&
        "p" == YT.gtmLastAction &&
        (dataLayer.push({ event: "youtube", action: "play", label: b }),
            (YT.gtmLastAction = ""));
    a.data == YT.PlayerState.PAUSED &&
        (dataLayer.push({ event: "youtube", action: "pause", label: b }),
            (YT.gtmLastAction = "p"));
}
function onPlayerError(a) {
    dataLayer.push({
        event: "error",
        action: "GTM",
        label: "youtube:" + a,
    });
}
function onPlayerPercent(a) {
    if (a.getPlayerState() == YT.PlayerState.PLAYING) {
        var b =
            1.5 >= a.getDuration() - a.getCurrentTime()
                ? 1
                : (
                    Math.floor((a.getCurrentTime() / a.getDuration()) * 4) / 4
                ).toFixed(2);
        if (!a.lastP || b > a.lastP) {
            var c = a.getVideoData();
            c = c.video_id + ":" + c.title;
            a.lastP = b;
            dataLayer.push({
                event: "youtube",
                action: 100 * b + "%",
                label: c,
            });
        }
        1 != a.lastP && setTimeout(onPlayerPercent, 1e3, a);
    }
}
window.onbeforeunload = function (a) {
    if ((a = a || window.event)) a.returnValue = "na";
    return "na";
};
window.onbeforeunload = trackYTUnload;
function trackYTUnload() {
    for (var a = 0; a < gtmYTplayers.length; a++)
        if (1 === gtmYTlisteners[a].getPlayerState()) {
            var b = gtmYTlisteners[a].getVideoData();
            b = b.video_id + ":" + b.title;
            dataLayer.push({ event: "youtube", action: "exit", label: b });
        }
}
var j = document.createElement("script"),
    f = document.getElementsByTagName("script")[0];
j.src = "//www.youtube.com/iframe_api";
j.async = !0;
f.parentNode.insertBefore(j, f);

!(function (b, e, f, g, a, c, d) {
    b.fbq ||
        ((a = b.fbq =
            function () {
                a.callMethod
                    ? a.callMethod.apply(a, arguments)
                    : a.queue.push(arguments);
            }),
            b._fbq || (b._fbq = a),
            (a.push = a),
            (a.loaded = !0),
            (a.version = "2.0"),
            (a.queue = []),
            (c = e.createElement(f)),
            (c.async = !0),
            (c.src = g),
            (d = e.getElementsByTagName(f)[0]),
            d.parentNode.insertBefore(c, d));
})(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
);
fbq("init", "2093663024174887");
fbq("track", "PageView");
function crumbleCookie(a) {
    for (
        var b = document.cookie.split(";"), c = {}, e = 0;
        e < b.length;
        e++
    ) {
        var f = b[e].substring(0, b[e].indexOf("\x3d")).trim(),
            g = b[e].substring(b[e].indexOf("\x3d") + 1, b[e].length).trim();
        c[f] = g;
    }
    return a ? (c[a] ? c[a] : null) : c;
}
function bakeCookie(a, b, c, e, f, g) {
    var d = new Date();
    d.setTime(d.getTime());
    c && (c *= 864e5);
    d = new Date(d.getTime() + c);
    document.cookie =
        a +
        "\x3d" +
        escape(b) +
        (c ? ";expires\x3d" + d.toGMTString() : "") +
        (e ? ";path\x3d" + e : "") +
        (f ? ";domain\x3d" + f : "") +
        (g ? ";secure" : "");
}
function writeLogic(a) {
    var b = getTrafficSource(a, ".deusto.es");
    b = b.replace(/\|{2,}/g, "|");
    b = b.replace(/^\|/, "");
    b = unescape(b);
    bakeCookie(a, b, 730, "/", "", "");
}
function getParam(a, b) {
    try {
        var c = a.match("[?\x26]" + b + "\x3d([^\x26]+)");
        return c ? c[1] : "";
    } catch (e) {
        return "";
    }
}
function calculateTrafficSource() {
    var a = "",
        b = "",
        c = "",
        e = "",
        f = "",
        g = [
            ["bing", "q"],
            ["google", "q"],
            ["yahoo", "q"],
            ["baidu", "q"],
            ["yandex", "q"],
            ["ask", "q"],
        ],
        d = document.referrer;
    ref_domain = d = d.substr(d.indexOf("//") + 2);
    ref_path = "/";
    ref_search = "";
    var h = document.location.search;
    if (-1 < h.indexOf("utm_source"))
        (a = getParam(h, "utm_source")),
            (b = getParam(h, "utm_medium")),
            (c = getParam(h, "utm_campaign")),
            (e = getParam(h, "utm_term")),
            (f = getParam(h, "utm_content"));
    else if (getParam(h, "gclid"))
        (a = "google"), (b = "cpc"), (c = "undefined");
    else if (d)
        for (
            -1 < d.indexOf("/") &&
            ((ref_domain = d.substr(0, d.indexOf("/"))),
                (ref_path = d.substr(d.indexOf("/"))),
                -1 < ref_path.indexOf("?") &&
                ((ref_search = ref_path.substr(ref_path.indexOf("?") + 1)),
                    (ref_path = ref_path.substr(0, ref_path.indexOf("?"))))),
            b = "referral",
            a = ref_domain,
            d = 0;
            d < g.length;
            d++
        )
            if (-1 < ref_domain.indexOf(g[d][0])) {
                b = "organic";
                a = g[d][0];
                e = getParam(ref_search, g[d][1]) || "(not provided)";
                break;
            }
    return { source: a, medium: b, campaign: c, term: e, content: f };
}
function getTrafficSource(a, b) {
    a = calculateTrafficSource();
    b = 0 === a.source.length ? "direct" : a.source;
    var c = 0 === a.medium.length ? "none" : a.medium,
        e = 0 === a.campaign.length ? "direct" : a.campaign;
    "referral" === c && (e = "");
    "none" === c && (e = "");
    "organic" === c && (e = "");
    var f = new Date();
    return (a =
        "source\x3d" +
        b +
        "\x26medium\x3d" +
        c +
        "\x26campaign\x3d" +
        e +
        "\x26term\x3d" +
        a.term +
        "\x26content\x3d" +
        a.content +
        "\x26date\x3d" +
        f.toISOString().slice(0, 10).replace(/-/g, ""));
}
(function () {
    var a = new Date();
    a.getUTCFullYear();
    a.getUTCMonth();
    a.getUTCMonth();
    a.getUTCDate();
    a.getUTCDate();
    a = crumbleCookie().FirstSession;
    "undefined" == typeof a
        ? writeLogic("FirstSession")
        : writeLogic("ReturningSession");
})();

jQuery(document).ready(function (a) {
    a(function () {
        a('a[href*\x3d"://deusto.force"]').attr("href", function (c, b) {
            aux =
                b +
                (-1 != b.indexOf("?")
                    ? "\x26" + google_tag_manager["rm"]["64124373"](426)
                    : "?" + google_tag_manager["rm"]["64124373"](427));
            console.log("valor:" + aux);
            return aux;
        });
    });
});
var trackByDefault = !0;
function acEnableTracking() {
    var a = new Date(new Date().getTime() + 2592e6);
    document.cookie =
        "ac_enable_tracking\x3d1; expires\x3d " + a + "; path\x3d/";
    acTrackVisit();
}
function acTrackVisit() {
    var a = "",
        b = document.createElement("script");
    b.async = !0;
    b.type = "text/javascript";
    b.src =
        "//trackcmp.net/visit?actid\x3d475529797\x26e\x3d" +
        encodeURIComponent(a) +
        "\x26r\x3d" +
        encodeURIComponent(document.referrer) +
        "\x26u\x3d" +
        encodeURIComponent(window.location.href);
    a = document.getElementsByTagName("script");
    a.length
        ? a[0].parentNode.appendChild(b)
        : ((a = document.getElementsByTagName("head")),
            a.length && a[0].appendChild(b));
}
(trackByDefault ||
    /(^|; )ac_enable_tracking=([^;]+)/.test(document.cookie)) &&
    acEnableTracking();
!(function (b, e, f, g, a, c, d) {
    b.fbq ||
        ((a = b.fbq =
            function () {
                a.callMethod
                    ? a.callMethod.apply(a, arguments)
                    : a.queue.push(arguments);
            }),
            b._fbq || (b._fbq = a),
            (a.push = a),
            (a.loaded = !0),
            (a.version = "2.0"),
            (a.queue = []),
            (c = e.createElement(f)),
            (c.async = !0),
            (c.src = g),
            (d = e.getElementsByTagName(f)[0]),
            d.parentNode.insertBefore(c, d));
})(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
);
fbq("init", "2093663024174887");
fbq("track", "PageView");

fbq("track", "SubmitApplication", {
    content_name: "ClicFormExt",
    currency: "EUR",
    value: google_tag_manager["rm"]["64124373"](704),
});

