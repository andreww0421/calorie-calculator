export function clearElement(element) {
    if (element) element.replaceChildren();
}

export function createElement(tagName, options = {}, children = []) {
    const element = document.createElement(tagName);
    const {
        className,
        text,
        attrs,
        dataset,
        style
    } = options;

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    if (attrs) {
        Object.entries(attrs).forEach(([name, value]) => {
            if (value !== undefined && value !== null) {
                element.setAttribute(name, String(value));
            }
        });
    }

    if (dataset) {
        Object.entries(dataset).forEach(([name, value]) => {
            if (value !== undefined && value !== null) {
                element.dataset[name] = String(value);
            }
        });
    }

    if (style) {
        Object.assign(element.style, style);
    }

    appendChildren(element, children);
    return element;
}

export function appendChildren(parent, children = []) {
    const normalized = Array.isArray(children) ? children : [children];
    normalized.flat().forEach((child) => {
        if (child === null || child === undefined || child === false) return;
        if (typeof child === 'string') {
            parent.appendChild(document.createTextNode(child));
            return;
        }
        parent.appendChild(child);
    });
    return parent;
}

export function createButton(label, onClick, options = {}) {
    const button = createElement('button', { ...options, text: label });
    if (typeof onClick === 'function') {
        button.addEventListener('click', onClick);
    }
    return button;
}

export function createLineBreak() {
    return document.createElement('br');
}
