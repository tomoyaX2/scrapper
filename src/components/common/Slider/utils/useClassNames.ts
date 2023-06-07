/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useContext, createContext } from 'react';
import classNames from 'classnames';
import { prefix as addPrefix } from './prefix';
const CustomContext = createContext<any>({});

/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns { withClassPrefix, merge, prefix }
 *  - withClassPrefix: A function of combining className and adding a prefix to each className.
 *    At the same time, the default `classPrefix` is the first className.
 *  - merge: A merge className function.
 *  - prefix: Add a prefix to className
 *  - rootPrefix
 */
function useClassNames(str: string) {
  const { classPrefix = 'rs' } = useContext(CustomContext) || {};
  const componentName = addPrefix(classPrefix, str);

  /**
   * @example
   *
   * if str = 'button':
   * prefix('red', { active: true }) => 'rs-button-red rs-button-active'
   */
  const prefix = useCallback(
    (...classes: any[]) => {
      const mergeClasses = classes.length
        ? classNames(...classes)
            .split(' ')
            .map(item => addPrefix(componentName, item))
        : [];

      return mergeClasses.filter(cls => cls).join(' ');
    },
    [componentName]
  );

  /**
   * @example
   *
   * if str = 'button':
   * withClassPrefix('red', { active: true }) => 'rs-button rs-button-red rs-button-active'
   */
  const withClassPrefix = useCallback(
    (...classes: any[]) => {
      const mergeClasses = prefix(classes);
      return mergeClasses ? `${componentName} ${mergeClasses}` : componentName;
    },
    [componentName, prefix]
  );

  /**
   * @example
   * rootPrefix('btn') => 'rs-btn'
   * rootPrefix('btn', { active: true }) => 'rs-btn rs-active'
   */
  const rootPrefix = (...classes: any[]) => {
    const mergeClasses = classes.length
      ? classNames(...classes)
          .split(' ')
          .map(item => addPrefix(classPrefix, item))
      : [];

    return mergeClasses.filter(cls => cls).join(' ');
  };

  return {
    withClassPrefix,
    merge: classNames,
    prefix,
    rootPrefix
  };
}

export default useClassNames;
