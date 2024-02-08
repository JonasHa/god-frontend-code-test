import { useCallback, useEffect, useState } from "react";

export const useCarouselSlider = () => {
  const [element, setElement] = useState<HTMLElement>();
  const [activeItem, setActiveItem] = useState<HTMLElement>();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const isInView = (parent: HTMLElement, child: HTMLElement) => {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const left = childRect.left - parentRect.left;
    const right = childRect.right - parentRect.right;

    if (left > -child.offsetWidth / 2 && right < child.offsetWidth / 2) {
      return true;
    }

    return false;
  };

  const scrollTo = useCallback(
    (children: Element[], child?: HTMLElement) => {
      if (!child || !element) return;

      const left = child.offsetLeft - element?.offsetLeft;

      const _activeItemIndex = children?.findIndex((c) => c === child);
      element.scrollTo({
        behavior: "smooth",
        left: left,
      });

      setActiveItem(child);
      setActiveItemIndex(_activeItemIndex);
    },
    [element]
  );
  const calculate = useCallback(
    (children: Element[] | null) => {
      if (!element || !children) return;
      const _itemsInView = children.reduce<HTMLElement[]>(
        (acc: HTMLElement[], el: any) => {
          if (isInView(element, el)) {
            acc.push(el);
          }
          return acc;
        },
        []
      );

      scrollTo(children, _itemsInView[0]);
    },
    [element, scrollTo]
  );

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!element) {
        return;
      }
      const startPos = {
        left: element.scrollLeft,
        top: element.scrollTop,
        x: e.clientX,
      };

      const handleMouseMove = (e: MouseEvent) => {
        element.style.userSelect = "none";
        const dx = e.clientX - startPos.x;
        element.scrollLeft = startPos.left - dx;
      };

      const handleMouseUp = () => {
        element.style.removeProperty("user-select");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        calculate(Array.from(element.children));
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [calculate, element]
  );

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!element) {
        return;
      }
      const touch = e.touches[0];
      const startPos = {
        left: element.scrollLeft,
        top: element.scrollTop,
        x: touch.clientX,
      };

      const handleTouchMove = (e: TouchEvent) => {
        element.style.userSelect = "none";
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        element.scrollLeft = startPos.left - dx;
      };

      const handleTouchEnd = () => {
        if (e.cancelable) e.preventDefault();
        element.style.removeProperty("user-select");
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        calculate(Array.from(element.children));
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [calculate, element]
  );

  useEffect(() => {
    if (!element) return;
    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("touchstart", onTouchStart);
    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      element.removeEventListener("touchstart", onTouchStart);
    };
  }, [onMouseDown, onTouchStart, element]);

  const next = useCallback(async () => {
    if (!element?.children) return;
    const children = Array.from(element.children);
    const index = children?.findIndex((child) => child === activeItem);
    const child = [...children][index + 1] as HTMLElement;
    scrollTo(children, child);
  }, [element?.children, scrollTo, activeItem]);

  const prev = () => {
    if (!element?.children) return;
    const children = Array.from(element.children);
    const index = children?.findIndex((child) => child === activeItem);
    const _children = [...children].slice(0, index);
    const filtered = _children.filter(
      (child) => !isInView(element, child as HTMLElement)
    ) as HTMLElement[];

    scrollTo(children, filtered[filtered.length - 1]);
  };

  const ref = useCallback(
    (element: HTMLUListElement) => {
      if (element && element.children) {
        const _children = Array.from(element.children) as HTMLElement[];

        setElement(element);
        calculate(_children);
      }
    },
    [calculate, setElement]
  );

  return { ref, next, prev, activeItemIndex };
};
