// Littleton, NH weekend hikes: rendering, day picker, sunset math.
(function () {
  "use strict";

  var TZ = "America/New_York";
  var BUFFER_MIN = 60; // safety margin before sunset

  // ---------- Date helpers (all in Eastern time) ----------
  function nyParts(d) {
    var f = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, year: "numeric", month: "numeric", day: "numeric", weekday: "short"
    });
    var p = {};
    f.formatToParts(d).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, wd: p.weekday };
  }

  var WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  // Returns {y,m,d} for the upcoming Saturday and the Sunday after it.
  // On a Saturday or Sunday, returns the current weekend.
  function weekendDates() {
    var now = nyParts(new Date());
    var wd = WD[now.wd];
    var base = new Date(Date.UTC(now.y, now.m - 1, now.d));
    var satOffset = wd === 6 ? 0 : wd === 0 ? -1 : 6 - wd;
    var sat = new Date(base.getTime() + satOffset * 86400000);
    var sun = new Date(sat.getTime() + 86400000);
    function toYMD(dt) { return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }; }
    return { sat: toYMD(sat), sun: toYMD(sun) };
  }

  // ---------- Sunset (NOAA-style algorithm) ----------
  var RAD = Math.PI / 180;
  function mod(a, n) { return ((a % n) + n) % n; }

  function dayOfYear(y, m, d) {
    return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 86400000);
  }

  // Returns a Date (UTC instant) of sunset at lat/lon for the given local calendar date.
  function sunset(y, m, d, lat, lon) {
    var zenith = 90.833;
    var N = dayOfYear(y, m, d);
    var lngHour = lon / 15;
    var t = N + (18 - lngHour) / 24;
    var M = 0.9856 * t - 3.289;
    var L = mod(M + 1.916 * Math.sin(M * RAD) + 0.02 * Math.sin(2 * M * RAD) + 282.634, 360);
    var RA = mod(Math.atan(0.91764 * Math.tan(L * RAD)) / RAD, 360);
    RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90;
    RA /= 15;
    var sinDec = 0.39782 * Math.sin(L * RAD);
    var cosDec = Math.cos(Math.asin(sinDec));
    var cosH = (Math.cos(zenith * RAD) - sinDec * Math.sin(lat * RAD)) / (cosDec * Math.cos(lat * RAD));
    if (cosH > 1 || cosH < -1) return null;
    var H = Math.acos(cosH) / RAD / 15;
    var T = H + RA - 0.06571 * t - 6.622;
    var UT = mod(T - lngHour, 24);
    return new Date(Date.UTC(y, m - 1, d) + UT * 3600000);
  }

  function fmtTime(date) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, hour: "numeric", minute: "2-digit"
    }).format(date);
  }

  function fmtDay(ymd) {
    var dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 12));
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC", weekday: "long", month: "long", day: "numeric"
    }).format(dt);
  }

  // ---------- Waze ----------
  function wazeUrl(stop) {
    var parts = [];
    if (typeof stop.lat === "number" && typeof stop.lon === "number") {
      parts.push("ll=" + stop.lat + "," + stop.lon);
    }
    if (stop.q) parts.push("q=" + encodeURIComponent(stop.q));
    parts.push("navigate=yes");
    parts.push("zoom=17");
    return "https://waze.com/ul?" + parts.join("&");
  }

  // ---------- Rendering ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var dates = weekendDates();
  var days = {
    sat: { key: "sat", ymd: dates.sat },
    sun: { key: "sun", ymd: dates.sun }
  };
  Object.keys(days).forEach(function (k) {
    var day = days[k];
    day.sunset = sunset(day.ymd.y, day.ymd.m, day.ymd.d, SITE.home.lat, SITE.home.lon);
  });

  var current = location.hash === "#sun" ? "sun" : "sat";

  function startBy(day, hike) {
    if (!day.sunset) return null;
    var ms = day.sunset.getTime() - (hike.time.maxHours * 60 + BUFFER_MIN) * 60000;
    return new Date(ms);
  }

  function renderDayPanel() {
    var day = days[current];
    var el = document.getElementById("day-panel");
    var forecastLinks = SITE.forecasts.map(function (f) {
      return '<a class="chip" href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.label) + "</a>";
    }).join("");
    el.innerHTML =
      '<h2 id="day-title">' + esc(fmtDay(day.ymd)) + "</h2>" +
      '<p class="sunset">Sunset ' + (day.sunset ? "<strong>" + esc(fmtTime(day.sunset)) + "</strong>" : "n/a") +
      ' <span class="muted">(calculated, Littleton NH)</span></p>' +
      '<p class="forecast-row"><span class="muted">Check the forecast before you go:</span> ' + forecastLinks + "</p>";
  }

  function renderHikes() {
    var day = days[current];
    var list = document.getElementById("hikes");
    list.innerHTML = SITE_HIKES.map(function (h) {
      var sb = startBy(day, h);
      var stops = h.stops.map(function (s) {
        return '<a class="btn waze" href="' + esc(wazeUrl(s)) + '" target="_blank" rel="noopener">' +
          '<span aria-hidden="true">&#128663;</span> Waze: ' + esc(s.label) + "</a>";
      }).join("");
      var infoLinks = h.links.filter(function (l) { return l.kind === "info"; });
      var mapLinks = h.links.filter(function (l) { return l.kind === "map"; });
      function chips(arr) {
        return arr.map(function (l) {
          return '<a class="chip" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
        }).join("");
      }
      return (
        '<article class="card" id="' + esc(h.id) + '">' +
          '<header>' +
            '<p class="area">' + esc(h.area) + "</p>" +
            "<h3>" + esc(h.name) + "</h3>" +
            '<ul class="stats">' +
              '<li><span>Difficulty</span>' + esc(h.difficulty) + "</li>" +
              '<li><span>Distance</span>' + esc(h.distance) + "</li>" +
              '<li><span>Climb</span>' + esc(h.gain) + "</li>" +
              '<li><span>Time</span>' + esc(h.time.label) + "</li>" +
              '<li><span>Drive</span>' + esc(h.drive) + "</li>" +
            "</ul>" +
          "</header>" +
          (sb ? '<p class="startby">Start hiking by <strong>' + esc(fmtTime(sb)) + "</strong> to finish an hour before sunset.</p>" : "") +
          "<p>" + esc(h.summary) + "</p>" +
          '<div class="cols">' +
            '<div><h4>Highlights</h4><ul>' + h.highlights.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
            '<div><h4>Heads up</h4><ul>' + h.watch.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
          "</div>" +
          '<div class="actions">' + stops + "</div>" +
          '<div class="links"><h4>Trail info</h4>' + chips(infoLinks) + "</div>" +
          (mapLinks.length ? '<div class="links"><h4>Trail maps</h4>' + chips(mapLinks) + "</div>" : "") +
        "</article>"
      );
    }).join("");
  }

  function renderStatic() {
    document.getElementById("checklist").innerHTML = SITE.checklist.map(function (x) {
      return "<li>" + esc(x) + "</li>";
    }).join("");
    document.getElementById("general-links").innerHTML = SITE.generalLinks.map(function (l) {
      return '<a class="chip" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("");
  }

  function setDay(key) {
    current = key;
    try { history.replaceState(null, "", "#" + key); } catch (e) { /* ignore */ }
    var btns = document.querySelectorAll("[data-day]");
    Array.prototype.forEach.call(btns, function (b) {
      var on = b.getAttribute("data-day") === key;
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderDayPanel();
    renderHikes();
  }

  // Alias to avoid clashing with the global HIKES name inside this closure.
  var SITE_HIKES = window.HIKES;

  // Fill the day button labels with real dates.
  document.getElementById("btn-sat").textContent = "Saturday " + fmtDay(days.sat.ymd).replace(/^Saturday, /, "");
  document.getElementById("btn-sun").textContent = "Sunday " + fmtDay(days.sun.ymd).replace(/^Sunday, /, "");

  Array.prototype.forEach.call(document.querySelectorAll("[data-day]"), function (b) {
    b.addEventListener("click", function () { setDay(b.getAttribute("data-day")); });
  });

  renderStatic();
  setDay(current);
})();
