"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ModalHandler_triggerModalMap, _ModalHandler_openModals;
class ModalHandler {
    constructor() {
        _ModalHandler_triggerModalMap.set(this, void 0);
        _ModalHandler_openModals.set(this, void 0);
        __classPrivateFieldSet(this, _ModalHandler_triggerModalMap, new Map(), "f");
        __classPrivateFieldSet(this, _ModalHandler_openModals, new Set(), "f");
        const triggers = document.querySelectorAll('[data-modaltarget]');
        triggers.forEach((trigger) => {
            const modal = document.querySelector('#' + CSS.escape(trigger.dataset.modaltarget));
            if (modal) {
                __classPrivateFieldGet(this, _ModalHandler_triggerModalMap, "f").set(trigger, modal);
                trigger.addEventListener('click', this.openModal.bind(this));
            }
        });
        this.handleClick = this.handleClick.bind(this);
    }
    openModal(e) {
        const trigger = e.target.closest('[data-modaltarget]');
        const modal = __classPrivateFieldGet(this, _ModalHandler_triggerModalMap, "f").get(trigger);
        if (modal) {
            e.stopPropagation();
            modal.showModal();
            __classPrivateFieldGet(this, _ModalHandler_openModals, "f").add(modal);
            document.addEventListener('click', this.handleClick);
        }
    }
    handleClick(e) {
        for (let modal of __classPrivateFieldGet(this, _ModalHandler_triggerModalMap, "f").values()) {
            if (modal.open && !modal.contains(e.target)) {
                modal.close();
                __classPrivateFieldGet(this, _ModalHandler_openModals, "f").delete(modal);
                if (__classPrivateFieldGet(this, _ModalHandler_openModals, "f").size === 0) {
                    document.removeEventListener('click', this.handleClick);
                }
            }
        }
    }
}
_ModalHandler_triggerModalMap = new WeakMap(), _ModalHandler_openModals = new WeakMap();
document.addEventListener('DOMContentLoaded', () => {
    new ModalHandler();
});
