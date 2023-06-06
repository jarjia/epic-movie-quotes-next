import { Profile as UserProfile } from '@/components';

const Profile = () => {
  return <UserProfile />;
};

// export const getServerSideProps = async () => {
//   await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
//   const res = await axios.get('http://127.0.0.1:8000/api/bla', {
//     withCredentials: true,
//   });
//   const data = res.data;
//   return { props: { data } };
// };

export default Profile;
