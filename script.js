document.addEventListener("DOMContentLoaded", function () {
    /* =========================
       1. Bottom Navigation Active
    ========================= */
    const currentPage =
        window.location.pathname.split("/").pop() || "hoso.html";

    const navLinks = document.querySelectorAll(".bottom-nav .nav-item");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    /* =========================
       2. Tabs Switching
    ========================= */
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
        });
    });

    /* =========================
       3. Format Currency
    ========================= */
    function formatCurrency(number) {
        return "₫" + Number(number).toLocaleString("vi-VN");
    }

    /* =========================
       4. Load dữ liệu localStorage
    ========================= */
    const dailyRefundEl = document.querySelector(
        ".summary-item:first-child .summary-value"
    );

    const totalRefundEl = document.querySelector(
        ".summary-item:last-child .summary-value"
    );

    const dailyRefund =
        Number(localStorage.getItem("dailyRefund")) || 17500;

    const totalRefund =
        Number(localStorage.getItem("totalRefund")) || 87500;

    if (dailyRefundEl) {
        dailyRefundEl.textContent = formatCurrency(dailyRefund);
    }

    if (totalRefundEl) {
        totalRefundEl.textContent = formatCurrency(totalRefund);
    }

    console.log("script.js loaded successfully");
});