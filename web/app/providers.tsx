'use client';

import { ReactNode } from 'react';
import { FluentProvider } from '@fluentui/react-components';
import { customTheme } from './theme';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <FluentProvider theme={customTheme}>
      {children}
    </FluentProvider>
  );
}
