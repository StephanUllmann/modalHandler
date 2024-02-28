interface ModalTrigger extends Element {
  dataset: {
    modaltarget: string;
  };
}

class ModalHandler {
  #triggerModalMap;
  #openModals;

  constructor() {
    this.#triggerModalMap = new Map();
    this.#openModals = new Set();

    const triggers: NodeListOf<ModalTrigger> = document.querySelectorAll('[data-modaltarget]');
    triggers.forEach((trigger) => {
      // const modal = document.getElementById(trigger.dataset.modaltarget);
      const modal = document.querySelector('#' + CSS.escape(trigger.dataset.modaltarget));
      if (modal) {
        this.#triggerModalMap.set(trigger, modal);
        trigger.addEventListener('click', this.openModal.bind(this));
      }
    });

    this.handleClick = this.handleClick.bind(this);
  }

  openModal(e: Event) {
    const trigger = (e.target as HTMLElement)!.closest('[data-modaltarget]');
    const modal = this.#triggerModalMap.get(trigger);
    if (modal) {
      e.stopPropagation();
      modal.showModal();
      this.#openModals.add(modal);
      document.addEventListener('click', this.handleClick);
    }
  }

  handleClick(e: Event) {
    // this.#triggerModalMap.forEach((modal) => {
    for (let modal of this.#triggerModalMap.values()) {
      if (modal.open && !modal.contains(e.target)) {
        modal.close();
        this.#openModals.delete(modal);
        if (this.#openModals.size === 0) {
          document.removeEventListener('click', this.handleClick);
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ModalHandler();
});
