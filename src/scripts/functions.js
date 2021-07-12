export function activate(element, className) {
    let current = document.getElementsByClassName(className);
    current[0].classList.toggle(className);
    element.classList.toggle(className);
}