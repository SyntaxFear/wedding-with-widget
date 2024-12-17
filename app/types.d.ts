declare module "expo-router" {
  import type { ComponentProps } from 'react';
  import type { LinkProps as OriginalLinkProps } from 'expo-router/build/link/Link';
  import type { Stack as OriginalStack } from 'expo-router/build/layouts/Stack';
  import type { Tabs as OriginalTabs } from 'expo-router/build/layouts/Tabs';

  export type PathNames =
    | "/"
    | "/(public)/onboarding"
    | "/(auth)/(tabs)"
    | "/(auth)/(tabs)/home"
    | "/(auth)/(tabs)/timeline"
    | "/(auth)/(tabs)/vendors"
    | "/(auth)/(tabs)/budget";

  export type LinkProps = Omit<OriginalLinkProps, 'href'> & {
    href: PathNames;
  };

  export const Link: React.ComponentType<LinkProps>;
  export const Stack: typeof OriginalStack;
  export const Tabs: typeof OriginalTabs;
  export const useRouter: () => {
    push: (href: PathNames) => void;
    replace: (href: PathNames) => void;
    back: () => void;
  };
  export const useSegments: () => string[];
  export const SplashScreen: {
    preventAutoHideAsync: () => Promise<void>;
    hideAsync: () => Promise<void>;
  };
  export const ErrorBoundary: React.ComponentType;
}

declare module "*.png" {
  const value: any;
  export = value;
}

interface TabIconProps {
  color: string;
  size: number;
}
