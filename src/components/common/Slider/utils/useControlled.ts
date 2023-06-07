/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRef, useState, useCallback } from 'react';

type InferDefined<T> = T extends infer U | undefined ? U : never;

/**
 * A hook for controlled value management.
 * In the case of passing the controlled value, the controlled value is returned, otherwise the value in state is returned.
 * Generally used for a component including controlled and uncontrolled modes.
 * @param controlledValue
 * @param defaultValue
 * @param formatValue
 */
function useControlled<V = any, D = V>(
  controlledValue: V,
  defaultValue: D
): [
  V extends undefined ? D : InferDefined<V>,
  (value: React.SetStateAction<V | null>) => void,
  boolean
];
function useControlled(
  controlledValue: number | undefined,
  defaultValue: number
) {
  const controlledRef = useRef(false);
  controlledRef.current = controlledValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  // If it is controlled, this directly returns the attribute value.
  const value = controlledRef.current ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: any) => {
      // Only update the value in state when it is not under control.
      if (!controlledRef.current) {
        setUncontrolledValue(nextValue);
      }
    },
    [controlledRef]
  );

  return [value, setValue, controlledRef.current];
}

export default useControlled;
