document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('show-game-info');
    const modal = document.getElementById('game-info-modal');
    const closeButton = document.getElementById('close-game-info');

    if (!openButton || !modal || !closeButton) return;

    const openModal = () => {
        modal.style.display = 'block';
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    };

    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
