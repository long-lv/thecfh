import { useLoading } from '../contexts/LoadingContext';

export const useGlobalLoading = () => {
  const { showLoading, hideLoading, isLoading, loadingMessage } = useLoading();

  return {
    showLoading,
    hideLoading,
    isLoading,
    loadingMessage,
  };
};
