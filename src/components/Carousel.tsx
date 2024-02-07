import { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { Spacer, View } from "vcc-ui";
import { Car, Filter } from "../hooks/useCars";
import CarouselDots from "./CarouselDots";
import CarouselFilter from "./CarouselFilter";
import { CarouselItem } from "./CarouselItem";
import CarouselNextPrev from "./CarouselNextPrev";

type Props = {
  items: Car[];
  filters?: Filter[];
  activeFilter: string;
  setActiveFilter: (val: string) => void;
};

export const Carousel = ({
  items,
  filters,
  activeFilter,
  setActiveFilter,
}: Props) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const carouselItems = items.map((item, index) => ({
    id: index.toString(),
    renderItem: <CarouselItem item={item} key={item.id} />,
  }));
  const indexes = items.map((_, index) => index)!;

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
    <View>
      <Spacer size={3} />
      <CarouselFilter
        filters={filters}
        active={activeFilter}
        setActive={setActiveFilter}
      />
      <View
        extend={{
          overflow: "hidden",
        }}
      >
        <View
          extend={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "32px",
            width: "75%",
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
      </View>
      <CarouselNextPrev next={slideToNextItem} previous={slideToPrevItem} />
      <CarouselDots indexes={indexes} currentIndex={activeItem} />
    </View>
  );
};
