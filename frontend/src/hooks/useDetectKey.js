import { useEffect } from 'react';

export default function useDetectKey(onPress) {
  useEffect(() => {
    document.addEventListener('keydown', onPress, false);

    return () => {
      document.removeEventListener('keydown', onPress, false);
    };
  }, [onPress]);
}
