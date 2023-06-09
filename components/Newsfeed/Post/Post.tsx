import { CommentIcon, HeartIcon } from '@/components';
import axios from 'axios';

const Post = () => {
  const r = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/language');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='text-white text-xl bg-post-bg rounded-xl sm:p-8 p-4 my-8'>
      <div>
        <div className='flex items-center'>
          <div
            className='w-profile h-profile rounded-full bg-center bg-cover'
            style={{ backgroundImage: 'url(/assets/images/user.png)' }}
          ></div>
          <p className='pl-4'>jarji abuashvili</p>
        </div>
        <div className='my-4'>
          <p className='break-words sm:text-base'>
            “Follow your dream.”movie-
            <span className='text-title'>Billy Elliot.</span>
            (2000)
          </p>
        </div>
      </div>
      <div>
        <div
          className='w-full h-[400px] sm:h-[250px] bg-center bg-cover bg-white rounded-form-radius'
          style={{
            backgroundImage:
              'url(https://i2-prod.chroniclelive.co.uk/incoming/article20915599.ece/ALTERNATES/s615b/0_BILLY-ELLIOT.jpg)',
          }}
        ></div>
        <div className='flex py-4 gap-6'>
          <button onClick={r} className='flex gap-2'>
            7
            <CommentIcon />
          </button>
          <button className='flex gap-2'>
            10
            <HeartIcon />
          </button>
        </div>
        <div className='w-full h-[1px] bg-search-bar-border'></div>
      </div>
      <div className='py-4'>
        <div>
          <div className='flex items-center'>
            <div
              className='w-profile h-profile rounded-full bg-center bg-cover'
              style={{ backgroundImage: 'url(/assets/images/user.png)' }}
            ></div>
            <p className='pl-4 break-words'>jarji abuashvili</p>
          </div>
          <div className='pl-[74px] sm:pl-0 sm:pt-2'>
            <p className='text-base break-words pb-3 border-b-[1px] border-search-bar-border'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque nunc vel massa facilisis consequat elit morbi
              convallis convallis. Volutpat vitae et nisl et. Adipiscing enim
              integer mi leo nisl. Arcu vitae mauris odio eget.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center'>
          <div>
            <div
              className='w-profile h-profile rounded-full bg-center bg-cover'
              style={{ backgroundImage: 'url(/assets/images/user.png)' }}
            ></div>
          </div>
          <div className='w-full ml-3'>
            <input
              type='text'
              className='w-full rounded-form-radius pl-4 placeholder-input pb-2 caret-white text-white border-0 bg-add-quote-bg focus:ring-0 focus:border-transparent'
              placeholder='Write a comment'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
