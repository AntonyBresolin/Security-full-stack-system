import React, { useEffect, useState } from 'react';
import { TweetServices } from '../../services/TweetServices';
import TableTwitter from '../../components/Table/TableTwitter';

const DashboardUser = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await TweetServices.listTweets();
        setTweets(data);
      } catch (error) {
        console.error('Failed to fetch tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <main className='flex items-start justify-center'>
      <TableTwitter data={tweets.feedItems ? tweets.feedItems : {}} />
    </main>
  );
};

export default DashboardUser;
