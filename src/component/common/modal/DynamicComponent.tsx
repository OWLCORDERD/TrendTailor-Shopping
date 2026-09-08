'use client';

import Loading from '@/component/common/Loading';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ModalContentRenderer = ({
  componentPath = 'Slot',
}: {
  componentPath?: string;
}) => {
  const path = componentPath || 'Slot';

  const DynamicComponent = useMemo(
    () =>
      dynamic(
        () => import(`@/component/common/modal/content/${path}`),
        {
          ssr: false,
          loading: () => <Loading colorTheme="#2D3A8C" height={300} />,
        }
      ),
    [path]
  );

  return <DynamicComponent key={path} />;
};

export default ModalContentRenderer;
