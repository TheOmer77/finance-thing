import { useSearchParams } from 'next/navigation';

const MODAL_SEARCH_KEY = 'modal';

type ModalValue = null | 'accounts-new';

export const useModal = () => {
  const searchParams = useSearchParams(),
    currentModal = searchParams.get(MODAL_SEARCH_KEY) as ModalValue;

  const openModal = (modal: ModalValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (modal === null) params.delete(MODAL_SEARCH_KEY);
    else params.set(MODAL_SEARCH_KEY, modal);
    return window.history.pushState(null, '', `?${params.toString()}`);
  };

  const closeModal = (delta = -1) => window.history.go(delta);

  return { currentModal, openModal, closeModal };
};
