(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Accordion {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    const defaultOptions = {
      transition: "height 0.3s ease",
      multiple: false
    };
    this.options = { ...defaultOptions, ...options };
    if (!this.container) {
      console.error(`Селектор аккордеона не найден: ${containerSelector}`);
      return;
    }
    this.items = this.container.querySelectorAll(".acc__item");
    this.init();
  }
  init() {
    this.items.forEach((item) => {
      const trigger = item.querySelector(".acc__trigger");
      const content = item.querySelector(".acc__content");
      content.style.height = "0";
      content.style.overflow = "hidden";
      content.style.transition = this.options.transition;
      trigger.addEventListener("click", () => this.toggleItem(item));
    });
  }
  toggleItem(item) {
    const content = item.querySelector(".acc__content");
    const isOpen = item.classList.contains("active");
    if (!this.options.multiple) {
      this.closeAllItems();
    }
    if (!isOpen) {
      item.classList.add("active");
      content.style.height = `${content.scrollHeight}px`;
    } else {
      item.classList.remove("active");
      content.style.height = "0";
    }
  }
  closeAllItems() {
    this.items.forEach((item) => {
      item.classList.remove("active");
      const content = item.querySelector(".acc__content");
      content.style.height = "0";
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("asdasddasasdasd");
  new Accordion(".acc", {
    transition: "height 0.3s ease",
    multiple: false
  });
});
//# sourceMappingURL=main-CGJb8f0E.js.map
