import { useEffect, useRef } from "react";

export function useWhyDidYouUpdate(name, props) {
  const latestProps = useRef(props);

  useEffect(() => {
    const allKeys = Object.keys({ ...latestProps.current, ...props });

    const changesObj = {};
    allKeys.forEach(key => {
      if (latestProps.current[key] !== props[key]) {
        changesObj[key] = { from: latestProps.current[key], to: props[key] };
      }
    });

    if (Object.keys(changesObj).length) {
      // tslint:disable-next-line no-console
      console.log("[why-did-you-update]", name, changesObj);
    }

    latestProps.current = props;
  }, Object.values(props));
}
