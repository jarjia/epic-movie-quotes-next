import { AppContext } from '@/context';
import { useContext } from 'react';
import { UserProfile } from './types';

const UserProfile: React.FC<UserProfile> = (props) => {
  const { userData } = useContext(AppContext);

  return (
    <div>
      <div
        className={`${
          props.width
            ? `w-[${props.width}] h-[${props.height}]`
            : 'w-profile h-profile'
        } rounded-full bg-center bg-cover`}
        style={{
          backgroundImage: `url(${userData.thumbnail})`,
        }}
      ></div>
    </div>
  );
};

export default UserProfile;
