import { useRouter } from 'next/router';
import { SingleComment } from './types';
import { ka, enUS } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const Comment: React.FC<SingleComment> = ({ comment }) => {
  const { t } = useTranslation('common');
  const date = new Date(comment.created_at);
  const router = useRouter();
  let locale = router.locale === 'en' ? enUS : ka;
  let initialTimeAgo = formatDistanceToNow(date, { locale });
  const [timePassed, setTimePassed] = useState(initialTimeAgo);

  useEffect(() => {
    let timeAgo = formatDistanceToNow(date, { locale }) + ' ' + t('ago');
    if (
      timeAgo.includes('წუთზე ნაკლები წინ') ||
      timeAgo.includes('less than a minute')
    ) {
      timeAgo = router.locale === 'en' ? 'now' : 'ახლა';
    }
    if (router.locale === 'ka') {
      timeAgo = timeAgo.replace('წუთი', 'წუთის');
      timeAgo = timeAgo.replace('საათი', 'საათის');
      timeAgo = timeAgo.replace('თვე', 'თვის');
      timeAgo = timeAgo.replace('დღე', 'დღის');
      timeAgo = timeAgo.replace('წელი', 'წლის');
    }
    setTimePassed(timeAgo);
  }, [date, locale, router.locale, t]);

  return (
    <div className='sm:pt-2'>
      <div className='flex items-center justify-between pr-2'>
        <div className='flex items-center'>
          <div
            className='w-profile h-profile rounded-full bg-center bg-cover'
            style={{
              backgroundImage: `url(${comment.user.thumbnail})`,
            }}
          ></div>
          <p className='pl-4 break-words capitalize'>{comment.user.name}</p>
        </div>
        <small className='capitalize text-sm text-gray-500'>{timePassed}</small>
      </div>
      <div className='pl-[74px] sm:pl-0 sm:pt-2'>
        <p className='text-base break-words pb-3 border-b-[1px] border-search-bar-border'>
          {comment.comment}
        </p>
      </div>
    </div>
  );
};

export default Comment;
