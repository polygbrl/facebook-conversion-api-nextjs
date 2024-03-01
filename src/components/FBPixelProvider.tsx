import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fbPageView } from '../conversion-api';

type Props = {
  children: React.ReactNode,
  triggerPageView: boolean
};

const FBPixelProvider = ({ children, triggerPageView }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (triggerPageView) fbPageView();

    router.events.on('routeChangeComplete', fbPageView);
    return () => {
      router.events.off('routeChangeComplete', fbPageView);
    };
  }, [router.events]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default FBPixelProvider;
