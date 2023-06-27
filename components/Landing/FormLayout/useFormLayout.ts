import { useContext } from 'react';
import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useQuery } from 'react-query';

const useFormLayout = () => {
  const { handleFeedFormStatus } = useContext(AppContext);
  const { getCrsfToken } = useAuthService();
  useQuery('csrf-token', getCrsfToken);

  return {
    handleFeedFormStatus,
  };
};

export default useFormLayout;
