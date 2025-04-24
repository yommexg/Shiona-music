import { useEffect } from "react";
import { useRouter, useRootNavigationState } from "expo-router";

export default function RootIndex() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Only navigate once the navigation system is ready
    if (!navigationState?.key) return;

    router.replace("/login");
  }, [navigationState]);

  return null;
}
