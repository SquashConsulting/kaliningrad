import { useEffect } from 'react';

/* Exports */
export default useDetectKey;

/* Module Functions */

function useDetectKey(onPress) {
  useEffect(() => {
    document.addEventListener('keydown', onPress, false);

    return () => {
      document.removeEventListener('keydown', onPress, false);
    };
  }, [onPress]);
}
