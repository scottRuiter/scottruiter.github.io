/* Immersive scroll behaviors: progress bar, nav state, reveals,
   parallax, count-up stats, gallery filter + lightbox, mobile nav. */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Scroll progress + nav ---------- */
    var progress = document.getElementById("progress");
    var nav = document.querySelector(".nav");

    function onScroll() {
        var doc = document.documentElement;
        var max = doc.scrollHeight - doc.clientHeight;
        if (progress && max > 0) {
            progress.style.width = (doc.scrollTop / max * 100) + "%";
        }
        if (nav) {
            nav.classList.toggle("scrolled", doc.scrollTop > 10);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile nav ---------- */
    var burger = document.querySelector(".nav-burger");
    var links = document.querySelector(".nav-links");

    if (burger && links) {
        burger.addEventListener("click", function () {
            var open = links.classList.toggle("open");
            burger.classList.toggle("open", open);
            document.body.classList.toggle("nav-open", open);
        });
        links.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                links.classList.remove("open");
                burger.classList.remove("open");
                document.body.classList.remove("nav-open");
            }
        });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll(".reveal, .reveal-l, .reveal-r");

    if ("IntersectionObserver" in window && !reduceMotion) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- Parallax backgrounds ---------- */
    var parallaxEls = document.querySelectorAll("[data-parallax]");

    if (parallaxEls.length && !reduceMotion) {
        var ticking = false;

        var updateParallax = function () {
            var vh = window.innerHeight;
            parallaxEls.forEach(function (el) {
                var rect = el.parentElement.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > vh) return;
                var speed = parseFloat(el.getAttribute("data-parallax")) || 0.25;
                var center = rect.top + rect.height / 2 - vh / 2;
                el.style.transform = "translateY(" + (center * -speed).toFixed(1) + "px)";
            });
            ticking = false;
        };

        window.addEventListener("scroll", function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateParallax);
            }
        }, { passive: true });
        updateParallax();
    }

    /* ---------- Count-up stats ---------- */
    var counters = document.querySelectorAll("[data-count]");

    function animateCount(el) {
        var target = parseFloat(el.getAttribute("data-count"));
        var duration = 1600;
        var start = null;

        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased).toLocaleString();
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    if (counters.length) {
        if ("IntersectionObserver" in window && !reduceMotion) {
            var cio = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        cio.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.6 });
            counters.forEach(function (el) { cio.observe(el); });
        } else {
            counters.forEach(function (el) {
                el.textContent = parseFloat(el.getAttribute("data-count")).toLocaleString();
            });
        }
    }

    /* ---------- Active nav link highlight ---------- */
    var sections = document.querySelectorAll("section[id]");
    var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
        var sio = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navAnchors.forEach(function (a) {
                        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
                    });
                }
            });
        }, { rootMargin: "-40% 0px -55% 0px" });
        sections.forEach(function (s) { sio.observe(s); });
    }

    /* ---------- Gallery filters ---------- */
    var filterBtns = document.querySelectorAll(".filter-btn");
    var galleryItems = document.querySelectorAll(".g-item");

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            var f = btn.getAttribute("data-filter");
            galleryItems.forEach(function (item) {
                item.classList.toggle("hidden", f !== "all" && item.getAttribute("data-cat") !== f);
            });
        });
    });

    /* ---------- Lightbox ---------- */
    var lightbox = document.getElementById("lightbox");

    if (lightbox && galleryItems.length) {
        var lbImg = lightbox.querySelector("img");
        var lbCap = lightbox.querySelector(".lb-cap");
        var current = -1;

        function visibleItems() {
            return Array.prototype.filter.call(galleryItems, function (i) {
                return !i.classList.contains("hidden");
            });
        }

        function openAt(idx) {
            var items = visibleItems();
            if (!items.length) return;
            current = (idx + items.length) % items.length;
            var item = items[current];
            var img = item.querySelector("img");
            lbImg.src = img.getAttribute("data-full") || img.src;
            lbImg.alt = img.alt;
            lbCap.textContent = img.alt;
            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
        }

        function closeLb() {
            lightbox.classList.remove("open");
            document.body.style.overflow = "";
        }

        galleryItems.forEach(function (item) {
            item.addEventListener("click", function () {
                openAt(visibleItems().indexOf(item));
            });
        });

        lightbox.querySelector(".lb-close").addEventListener("click", closeLb);
        lightbox.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); openAt(current - 1); });
        lightbox.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); openAt(current + 1); });
        lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });

        document.addEventListener("keydown", function (e) {
            if (!lightbox.classList.contains("open")) return;
            if (e.key === "Escape") closeLb();
            if (e.key === "ArrowLeft") openAt(current - 1);
            if (e.key === "ArrowRight") openAt(current + 1);
        });
    }
})();
