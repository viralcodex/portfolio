// Navigation component
(function () {
  const currentPath = window.location.pathname;

  const navItems = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/blog", label: "blog" },
    { href: "/help", label: "help" },
    { href: "/json", label: "json" },
  ];

  const navHTML = navItems
    .map((item) => {
      const isActive =
        currentPath === item.href ||
        currentPath === `${item.href}.html` ||
        (currentPath === "/index.html" && item.href === "/") ||
        (currentPath === "/" && item.href === "/");
      const activeClass = isActive ? ' class="active"' : "";
      return `<a href="${item.href}"${activeClass}>${item.label}</a>`;
    })
    .join("\n      ");

  const nav = document.createElement("nav");
  nav.className =
    "mt-6 md:mt-8 flex gap-3 md:gap-4 text-sm md:text-base border-b border-green-900 pb-3 md:pb-4 mb-6";
  nav.innerHTML = navHTML;

  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) {
    navPlaceholder.replaceWith(nav);
  }
})();
