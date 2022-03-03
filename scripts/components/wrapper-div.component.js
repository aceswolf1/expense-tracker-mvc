export class WrapperContainer {
    createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('mdl-grid');

        return wrapper;
    }
}