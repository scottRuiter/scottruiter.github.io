(function () {
    "use strict";

    var STORAGE_KEY = "topx-dashboard-ticker-v2";
    var STORAGE_LEGACY = "topx-dashboard-ticker";

    var TICKERS = [
        { id: "BTC", label: "BTC", pair: "BTC/USD", symbol: "COINBASE:BTCUSD", chart: "BINANCE:BTCUSD", group: "majors" },
        { id: "ETH", label: "ETH", pair: "ETH/USD", symbol: "COINBASE:ETHUSD", chart: "BINANCE:ETHUSD", group: "majors" },
        { id: "SOL", label: "SOL", pair: "SOL/USD", symbol: "COINBASE:SOLUSD", chart: "BINANCE:SOLUSD", group: "majors" },
        { id: "BNB", label: "BNB", pair: "BNB/USD", symbol: "BINANCE:BNBUSD", chart: "BINANCE:BNBUSD", group: "majors" },
        { id: "XRP", label: "XRP", pair: "XRP/USD", symbol: "BINANCE:XRPUSD", chart: "BINANCE:XRPUSD", group: "majors" },
        { id: "ADA", label: "ADA", pair: "ADA/USD", symbol: "COINBASE:ADAUSD", chart: "BINANCE:ADAUSD", group: "majors" },
        { id: "DOGE", label: "DOGE", pair: "DOGE/USD", symbol: "COINBASE:DOGEUSD", chart: "BINANCE:DOGEUSD", group: "majors" },
        { id: "NVDA", label: "NVDA", pair: "NVIDIA", symbol: "NASDAQ:NVDA", chart: "NASDAQ:NVDA", group: "ai" },
        { id: "MSFT", label: "MSFT", pair: "Microsoft", symbol: "NASDAQ:MSFT", chart: "NASDAQ:MSFT", group: "ai" },
        { id: "GOOGL", label: "GOOGL", pair: "Alphabet", symbol: "NASDAQ:GOOGL", chart: "NASDAQ:GOOGL", group: "ai" },
        { id: "META", label: "META", pair: "Meta", symbol: "NASDAQ:META", chart: "NASDAQ:META", group: "ai" },
        { id: "AMZN", label: "AMZN", pair: "Amazon", symbol: "NASDAQ:AMZN", chart: "NASDAQ:AMZN", group: "ai" },
        { id: "AMD", label: "AMD", pair: "AMD", symbol: "NASDAQ:AMD", chart: "NASDAQ:AMD", group: "ai" },
        { id: "AVGO", label: "AVGO", pair: "Broadcom", symbol: "NASDAQ:AVGO", chart: "NASDAQ:AVGO", group: "ai" },
        { id: "TSM", label: "TSM", pair: "TSMC", symbol: "NYSE:TSM", chart: "NYSE:TSM", group: "ai" },
        { id: "ARM", label: "ARM", pair: "Arm", symbol: "NASDAQ:ARM", chart: "NASDAQ:ARM", group: "ai" },
        { id: "ASML", label: "ASML", pair: "ASML", symbol: "NASDAQ:ASML", chart: "NASDAQ:ASML", group: "ai" },
        { id: "PLTR", label: "PLTR", pair: "Palantir", symbol: "NASDAQ:PLTR", chart: "NASDAQ:PLTR", group: "ai" },
        { id: "ORCL", label: "ORCL", pair: "Oracle", symbol: "NYSE:ORCL", chart: "NYSE:ORCL", group: "ai" },
        { id: "AVAX", label: "AVAX", pair: "AVAX/USD", symbol: "COINBASE:AVAXUSD", chart: "BINANCE:AVAXUSD", group: "alts" },
        { id: "LINK", label: "LINK", pair: "LINK/USD", symbol: "COINBASE:LINKUSD", chart: "BINANCE:LINKUSD", group: "alts" },
        { id: "DOT", label: "DOT", pair: "DOT/USD", symbol: "COINBASE:DOTUSD", chart: "BINANCE:DOTUSD", group: "alts" },
        { id: "ATOM", label: "ATOM", pair: "ATOM/USD", symbol: "COINBASE:ATOMUSD", chart: "BINANCE:ATOMUSD", group: "alts" },
        { id: "LTC", label: "LTC", pair: "LTC/USD", symbol: "COINBASE:LTCUSD", chart: "BINANCE:LTCUSD", group: "alts" },
        { id: "BCH", label: "BCH", pair: "BCH/USD", symbol: "COINBASE:BCHUSD", chart: "BINANCE:BCHUSD", group: "alts" },
        { id: "POL", label: "POL", pair: "POL/USD", symbol: "COINBASE:POLUSD", chart: "COINBASE:POLUSD", group: "alts" },
        { id: "UNI", label: "UNI", pair: "UNI/USD", symbol: "COINBASE:UNIUSD", chart: "COINBASE:UNIUSD", group: "defi" },
        { id: "AAVE", label: "AAVE", pair: "AAVE/USD", symbol: "COINBASE:AAVEUSD", chart: "COINBASE:AAVEUSD", group: "defi" },
        { id: "LDO", label: "LDO", pair: "LDO/USD", symbol: "COINBASE:LDOUSD", chart: "COINBASE:LDOUSD", group: "defi" },
        { id: "GRT", label: "GRT", pair: "GRT/USD", symbol: "COINBASE:GRTUSD", chart: "COINBASE:GRTUSD", group: "defi" },
        { id: "FIL", label: "FIL", pair: "FIL/USD", symbol: "COINBASE:FILUSD", chart: "COINBASE:FILUSD", group: "alts" },
        { id: "ICP", label: "ICP", pair: "ICP/USD", symbol: "COINBASE:ICPUSD", chart: "COINBASE:ICPUSD", group: "alts" }
    ];

    var GROUPS = [
        { id: "ai", label: "AI" },
        { id: "majors", label: "Crypto" },
        { id: "alts", label: "Alts" },
        { id: "defi", label: "DeFi" }
    ];

    function isMobile() {
        return window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
    }

    function byId(id) {
        for (var i = 0; i < TICKERS.length; i++) {
            if (TICKERS[i].id === id) return TICKERS[i];
        }
        return null;
    }

    function saveTicker(ticker) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                id: ticker.id,
                label: ticker.label,
                pair: ticker.pair,
                symbol: ticker.symbol,
                chart: ticker.chart,
                custom: !!ticker.custom
            }));
        } catch (e) { /* ignore */ }
    }

    function loadSavedTicker() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                if (parsed && parsed.symbol && parsed.chart) {
                    if (!parsed.custom) {
                        var known = byId(parsed.id);
                        if (known) return known;
                    }
                    return {
                        id: parsed.id || ("custom:" + parsed.symbol),
                        label: parsed.label || parsed.pair || parsed.symbol,
                        pair: parsed.pair || parsed.symbol,
                        symbol: parsed.symbol,
                        chart: parsed.chart,
                        custom: true,
                        group: "custom"
                    };
                }
            }
            var legacy = localStorage.getItem(STORAGE_LEGACY);
            if (legacy) {
                var fromLegacy = byId(legacy);
                if (fromLegacy) return fromLegacy;
            }
        } catch (e) { /* ignore */ }
        return byId("BTC");
    }

    function setStatus(message, isError) {
        var el = document.getElementById("ticker-custom-status");
        if (!el) return;
        el.textContent = message;
        el.classList.toggle("is-error", !!isError);
    }

    function resolveInput(raw) {
        if (!raw) return null;
        var cleaned = String(raw).trim().toUpperCase().replace(/\s+/g, "");
        if (!cleaned) return null;

        // Full TradingView id: EXCHANGE:SYMBOL
        if (/^[A-Z0-9._]+:[A-Z0-9._]+$/.test(cleaned)) {
            var parts = cleaned.split(":");
            var sym = parts[1];
            var pairLabel = sym;
            if (/USDT$/.test(sym)) pairLabel = sym.slice(0, -4) + "/USDT";
            else if (/USD$/.test(sym)) pairLabel = sym.slice(0, -3) + "/USD";
            return {
                id: "custom:" + cleaned,
                label: pairLabel,
                pair: pairLabel,
                symbol: cleaned,
                chart: cleaned,
                custom: true,
                group: "custom"
            };
        }

        // Normalize separators: BTC/USD, BTC-USD, BTC_USD
        cleaned = cleaned.replace(/[\/\-_]/g, "");

        var base = cleaned;
        var quote = "USD";
        if (/USDT$/.test(cleaned) && cleaned.length > 4) {
            base = cleaned.slice(0, -4);
            quote = "USDT";
        } else if (/USD$/.test(cleaned) && cleaned.length > 3) {
            base = cleaned.slice(0, -3);
            quote = "USD";
        }

        if (!/^[A-Z0-9]{2,12}$/.test(base)) return null;

        var known = byId(base);
        if (known) return known;

        var pair = base + "/" + quote;
        var symbol;
        var chart;
        if (quote === "USDT") {
            symbol = "BINANCE:" + base + "USDT";
            chart = symbol;
        } else {
            symbol = "COINBASE:" + base + "USD";
            chart = "BINANCE:" + base + "USD";
        }

        return {
            id: "custom:" + symbol,
            label: base,
            pair: pair,
            symbol: symbol,
            chart: chart,
            custom: true,
            group: "custom"
        };
    }

    function mountEmbed(host, scriptSrc, config) {
        host.innerHTML = "";
        var wrap = document.createElement("div");
        wrap.className = "tradingview-widget-container";
        var slot = document.createElement("div");
        slot.className = "tradingview-widget-container__widget";
        wrap.appendChild(slot);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptSrc;
        script.async = true;
        script.textContent = JSON.stringify(config);
        wrap.appendChild(script);
        host.appendChild(wrap);
    }

    function mountAdvancedChart(ticker) {
        var host = document.getElementById("tv-advanced-chart");
        if (!host) return;
        host.innerHTML = "";

        var mobile = isMobile();
        var height = mobile ? 420 : 560;
        host.style.height = height + "px";
        host.style.minHeight = height + "px";

        function boot() {
            if (typeof TradingView === "undefined") return false;
            new TradingView.widget({
                container_id: "tv-advanced-chart",
                symbol: ticker.chart,
                interval: "D",
                autosize: true,
                width: "100%",
                height: height,
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "en",
                enable_publishing: false,
                hide_side_toolbar: mobile,
                allow_symbol_change: true,
                studies: [
                    "RSI@tv-basicstudies",
                    "StochasticRSI@tv-basicstudies"
                ]
            });
            return true;
        }

        if (boot()) return;

        var tries = 0;
        var timer = setInterval(function () {
            tries += 1;
            if (boot() || tries > 80) clearInterval(timer);
        }, 100);
    }

    function applyTicker(ticker, opts) {
        opts = opts || {};
        var quoteTitle = document.getElementById("tv-quote-title");
        var taTitle = document.getElementById("tv-ta-title");
        var chartTitle = document.getElementById("tv-chart-title");
        if (quoteTitle) quoteTitle.textContent = "Quote — " + ticker.pair;
        if (taTitle) taTitle.textContent = "Technical Analysis — " + ticker.pair;
        if (chartTitle) chartTitle.textContent = "Advanced Chart — " + ticker.pair;

        var chips = document.querySelectorAll(".ticker-chip");
        for (var i = 0; i < chips.length; i++) {
            var active = !ticker.custom && chips[i].getAttribute("data-id") === ticker.id;
            chips[i].classList.toggle("is-active", active);
            chips[i].setAttribute("aria-pressed", active ? "true" : "false");
        }

        var input = document.getElementById("ticker-custom-input");
        if (input && opts.syncInput !== false) {
            if (ticker.custom) input.value = ticker.symbol;
            else if (opts.clearInput) input.value = "";
        }

        if (ticker.custom) {
            setStatus("Custom: " + ticker.symbol + " — if TradingView has no feed, try EXCHANGE:SYMBOL (e.g. BINANCE:NEARUSDT).", false);
        } else if (!opts.keepStatus) {
            setStatus("Or type any symbol — stock (NVDA), crypto (NEARUSD), or full id (NASDAQ:PLTR).", false);
        }

        var taHeight = isMobile() ? 400 : 450;
        var taHost = document.getElementById("tv-ta");
        if (taHost) {
            taHost.style.minHeight = taHeight + "px";
            mountEmbed(taHost, "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js", {
                showIntervalTabs: true,
                width: "100%",
                colorTheme: "dark",
                isTransparent: true,
                locale: "en",
                symbol: ticker.symbol,
                interval: "1W",
                height: taHeight
            });
        }

        var quoteHost = document.getElementById("tv-quote");
        if (quoteHost) {
            mountEmbed(quoteHost, "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js", {
                symbols: [{ description: ticker.pair, proName: ticker.symbol }],
                colorTheme: "dark",
                isTransparent: true,
                locale: "en",
                showSymbolLogo: true
            });
        }

        mountAdvancedChart(ticker);
        saveTicker(ticker);
    }

    function buildPicker(root) {
        GROUPS.forEach(function (group) {
            var row = document.createElement("div");
            row.className = "ticker-group";

            var label = document.createElement("span");
            label.className = "ticker-group-label";
            label.textContent = group.label;
            row.appendChild(label);

            var chips = document.createElement("div");
            chips.className = "ticker-chips";
            chips.setAttribute("role", "group");
            chips.setAttribute("aria-label", group.label + " tickers");

            TICKERS.filter(function (t) { return t.group === group.id; }).forEach(function (ticker) {
                var btn = document.createElement("button");
                btn.type = "button";
                btn.className = "ticker-chip";
                btn.setAttribute("data-id", ticker.id);
                btn.setAttribute("aria-pressed", "false");
                btn.textContent = ticker.label;
                btn.title = ticker.pair;
                btn.addEventListener("click", function () {
                    applyTicker(ticker, { clearInput: true });
                });
                chips.appendChild(btn);
            });

            row.appendChild(chips);
            root.appendChild(row);
        });
    }

    function wireCustomForm() {
        var form = document.getElementById("ticker-custom-form");
        var input = document.getElementById("ticker-custom-input");
        if (!form || !input) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var ticker = resolveInput(input.value);
            if (!ticker) {
                setStatus("Enter a ticker like NVDA, NEARUSD, or NASDAQ:PLTR.", true);
                input.focus();
                return;
            }
            applyTicker(ticker, { syncInput: true });
            if (isMobile()) {
                var quote = document.getElementById("tv-quote-title");
                if (quote && quote.scrollIntoView) {
                    quote.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    }

    function init() {
        var picker = document.getElementById("ticker-picker");
        if (!picker) return;
        buildPicker(picker);
        wireCustomForm();
        applyTicker(loadSavedTicker(), { keepStatus: false });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
