import { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { View } from "vcc-ui";
import { Car } from "../hooks/useCars";
import styles from "./Carousel.module.css";
import CarouselDots from "./CarouselDots";
import { CarouselItem } from "./CarouselItem";
import CarouselNextPrev from "./CarouselNextPrev";

type Props = {
  items: Car[];
};

export const Carousel = ({ items }: Props) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const carouselItems = items.map((item, index) => ({
    id: index.toString(),
    renderItem: <CarouselItem item={item} key={item.id} />,
  }));
  const indexes = items.map((_, index) => index);

  const {
    carouselFragment,
    useListenToCustomEvent,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    items: carouselItems,
  });

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(Number(event.nextItem.id));
    }
  });

  return (
    <View as="section" className={styles.section}>
      <View
        className={styles.carouselWrapper}
        extend={{
          width: "80%",
          onlyM: {
            width: "40%",
          },
          fromL: {
            width: "25%",
          },
        }}
      >
        {carouselFragment}
      </View>
      <CarouselNextPrev next={slideToNextItem} previous={slideToPrevItem} />
      <CarouselDots indexes={indexes} currentIndex={activeItem} />
    </View>
  );
};
