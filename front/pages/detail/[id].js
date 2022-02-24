import { useRouter } from 'next/router';
import React from 'react';

const Detail = (props) => {
  const router = useRouter();
  return <div>{`detail ${router.query.id}`}</div>;
};

export default Detail;
