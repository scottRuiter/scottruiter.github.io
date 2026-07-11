/* Interactive fixtureless alignment + tolerance-ring demo.
   Models the real workflow: measured data = nominal grid distorted by a
   systematic pose error (translation + rotation) plus per-pin noise.
   Best-fit alignment removes the systematic part; tolerance scoring
   judges only the residual per-pin deviation. */
(function () {
    "use strict";

    var canvas = document.getElementById("pin-demo-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var readout = document.getElementById("demo-readout");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var UM_PER_PX = 12;          // 1 CSS px = 12 µm on this virtual board
    var TOL_UM = 120;            // acceptance tolerance
    var TOL_PX = TOL_UM / UM_PER_PX;
    var COLS = 12, ROWS = 8;

    var dpr = window.devicePixelRatio || 1;
    var pins = [];
    var step = 0;
    var animId = null;
    var selected = -1;

    /* Deterministic PRNG so the same "board" renders on every visit */
    function mulberry32(seed) {
        return function () {
            seed |= 0; seed = seed + 0x6D2B79F5 | 0;
            var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    function cssSize() {
        return { w: canvas.width / dpr, h: canvas.height / dpr };
    }

    function buildPins() {
        var s = cssSize();
        var padX = s.w * 0.13;
        var padY = s.h * 0.16;
        var gapX = (s.w - padX * 2) / (COLS - 1);
        var gapY = (s.h - padY * 2) / (ROWS - 1);

        var rand = mulberry32(20260704);
        var cx = s.w / 2, cy = s.h / 2;

        /* Systematic pose error the fixtureless workflow must absorb */
        var theta = 0.035;                       // ~2° rotation
        var tx = gapX * 0.55, ty = -gapY * 0.4;  // translation
        var cosT = Math.cos(theta), sinT = Math.sin(theta);

        pins = [];
        for (var r = 0; r < ROWS; r++) {
            for (var c = 0; c < COLS; c++) {
                var nx = padX + c * gapX;
                var ny = padY + r * gapY;

                /* Per-pin residual noise: mostly small, a few true outliers */
                var mag, roll = rand();
                if (roll > 0.94) mag = TOL_PX * (1.15 + rand() * 0.5);   // outlier
                else mag = (rand() + rand()) * 0.5 * TOL_PX * 0.55;      // in-tolerance
                var ang = rand() * Math.PI * 2;
                var ex = Math.cos(ang) * mag;
                var ey = Math.sin(ang) * mag;

                /* measured = rotate+translate(nominal + noise) */
                var px = nx + ex - cx, py = ny + ey - cy;
                var mx = cx + px * cosT - py * sinT + tx;
                var my = cy + px * sinT + py * cosT + ty;

                var devUm = Math.hypot(ex, ey) * UM_PER_PX;
                pins.push({
                    row: r + 1, col: c + 1,
                    nx: nx, ny: ny,          // nominal site
                    mx: mx, my: my,          // raw measured (pose error + noise)
                    ax: nx + ex, ay: ny + ey, // after best-fit (noise only)
                    devUm: devUm,
                    pass: devUm <= TOL_UM
                });
            }
        }
    }

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp01(v) { return Math.min(Math.max(v, 0), 1); }

    function pinPos(p, progress) {
        var tAlign = clamp01((progress - 0.1) / 0.5);
        return {
            x: lerp(p.mx, p.ax, tAlign),
            y: lerp(p.my, p.ay, tAlign)
        };
    }

    function draw(progress) {
        var s = cssSize();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, s.w, s.h);

        ctx.fillStyle = "#0b111c";
        ctx.fillRect(0, 0, s.w, s.h);

        ctx.strokeStyle = "rgba(79, 209, 255, 0.10)";
        ctx.lineWidth = 1;
        for (var gx = 0; gx < s.w; gx += 28) {
            ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, s.h); ctx.stroke();
        }
        for (var gy = 0; gy < s.h; gy += 28) {
            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(s.w, gy); ctx.stroke();
        }

        var tRings = clamp01((progress - 0.6) / 0.35);

        pins.forEach(function (p, i) {
            var pos = pinPos(p, progress);

            /* Nominal ghost site */
            ctx.beginPath();
            ctx.arc(p.nx, p.ny, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(143, 161, 184, 0.5)";
            ctx.fill();

            /* Tolerance ring around the nominal site */
            if (tRings > 0.02) {
                ctx.beginPath();
                ctx.arc(p.nx, p.ny, TOL_PX * tRings, 0, Math.PI * 2);
                ctx.strokeStyle = p.pass ? "rgba(79, 209, 255, 0.30)" : "rgba(255, 128, 96, 0.55)";
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            /* Residual line nominal -> current pin */
            ctx.beginPath();
            ctx.moveTo(p.nx, p.ny);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = tRings > 0.5 && !p.pass
                ? "rgba(255, 128, 96, 0.6)"
                : "rgba(79, 209, 255, 0.18)";
            ctx.lineWidth = 1;
            ctx.stroke();

            /* Measured pin */
            var isSel = selected === i;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, isSel ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = tRings > 0.5
                ? (p.pass ? "#4fd1ff" : "#ff8060")
                : "#7c6cff";
            ctx.fill();

            if (isSel) {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
                ctx.strokeStyle = "#ffc860";
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        });

        /* Legend */
        ctx.fillStyle = "#8fa1b8";
        ctx.font = "600 11px 'Space Grotesk', sans-serif";
        var line = 18;
        ctx.fillText("Grey dots: nominal (drill-drawing) sites", 14, line); line += 16;
        if (progress < 0.6) {
            ctx.fillText("Violet dots: measured pins (pose error + noise)", 14, line); line += 16;
        }
        if (progress >= 0.55) {
            ctx.fillText("Best-fit removed translation + rotation", 14, line); line += 16;
        }
        if (tRings > 0.2) {
            ctx.fillText("Rings: " + TOL_UM + " \u00b5m tolerance at each site", 14, line);
        }

        /* Verdict */
        if (tRings > 0.5) {
            var passCount = pins.filter(function (p) { return p.pass; }).length;
            var failCount = pins.length - passCount;
            ctx.font = "700 13px 'Space Grotesk', sans-serif";
            ctx.fillStyle = "#4fd1ff";
            ctx.fillText("PASS " + passCount, s.w - 150, 20);
            ctx.fillStyle = "#ff8060";
            ctx.fillText("FAIL " + failCount, s.w - 74, 20);
        }
    }

    function setStep(toStep) {
        if (animId) cancelAnimationFrame(animId);
        if (reduceMotion) {
            step = toStep;
            draw(step);
            return;
        }
        var from = step;
        var start = null;
        var duration = 900;

        function frame(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var current = lerp(from, toStep, eased);
            draw(current);
            if (p < 1) {
                animId = requestAnimationFrame(frame);
            } else {
                step = toStep;
                animId = null;
            }
        }
        animId = requestAnimationFrame(frame);
    }

    function updateReadout(p) {
        if (!readout) return;
        if (!p) {
            readout.textContent = "Tap a pin — or Inspect outlier — to read residual deviation.";
            readout.style.color = "";
            return;
        }
        var status = p.pass ? "PASS" : "FAIL";
        readout.textContent =
            "Pin R" + p.row + "-C" + p.col + " \u2014 residual deviation " +
            Math.round(p.devUm) + " \u00b5m vs " + TOL_UM + " \u00b5m tolerance \u2014 " + status;
        readout.style.color = p.pass ? "#4fd1ff" : "#ff8060";
    }

    function hitRadius() {
        return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 860 ? 28 : 16;
    }

    function selectNearest(x, y) {
        var best = -1, bestD = hitRadius();
        pins.forEach(function (p, i) {
            var pos = pinPos(p, step);
            var d = Math.hypot(x - pos.x, y - pos.y);
            if (d < bestD) { best = i; bestD = d; }
        });
        selected = best;
        updateReadout(best >= 0 ? pins[best] : null);
        draw(step);
    }

    function inspectOutlier() {
        var fails = [];
        pins.forEach(function (p, i) { if (!p.pass) fails.push(i); });
        if (!fails.length) {
            selected = -1;
            updateReadout(null);
            draw(step);
            return;
        }
        var idx = fails.indexOf(selected);
        selected = fails[(idx + 1) % fails.length];
        updateReadout(pins[selected]);

        var tolBtn = document.querySelector('[data-demo-step="1"]');
        if (tolBtn) {
            document.querySelectorAll("[data-demo-step]").forEach(function (b) {
                b.classList.toggle("active", b === tolBtn);
                b.setAttribute("aria-pressed", b === tolBtn ? "true" : "false");
            });
        }
        if (step < 1) {
            setStep(1);
        } else {
            draw(step);
        }
    }

    canvas.addEventListener("pointerdown", function (e) {
        var rect = canvas.getBoundingClientRect();
        selectNearest(e.clientX - rect.left, e.clientY - rect.top);
    });

    var inspectBtn = document.getElementById("demo-inspect");
    if (inspectBtn) {
        inspectBtn.addEventListener("click", function (e) {
            e.preventDefault();
            inspectOutlier();
        });
    }

    document.querySelectorAll("[data-demo-step]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.querySelectorAll("[data-demo-step]").forEach(function (b) {
                b.classList.toggle("active", b === btn);
                b.setAttribute("aria-pressed", b === btn ? "true" : "false");
            });
            setStep(parseFloat(btn.getAttribute("data-demo-step")));
        });
    });

    function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(Math.min(rect.width * 0.68, 430) * dpr);
        canvas.style.height = (canvas.height / dpr) + "px";
        buildPins();
        draw(step);          // preserve current step on resize
    }

    window.addEventListener("resize", resize);
    resize();
    updateReadout(null);
    draw(0);
})();
