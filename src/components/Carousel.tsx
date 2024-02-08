import { Spacer, View } from "vcc-ui";
import { useCarouselSlider } from "../hooks/useCarouselSlider";
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
  const { ref, next, prev, activeItemIndex } = useCarouselSlider();
  const indexes = items.map((_, index) => index);

  return (
    <View>
      <Spacer size={3} />
      <CarouselFilter
        filters={filters}
        active={activeFilter}
        setActive={setActiveFilter}
      />
      <View
        as="ul"
        role="list"
        extend={{
          display: "flex",
          flexDirection: "row",
          padding: 0,
          margin: "0 0 32px 0",
          overflowX: "scroll",
          scrollbarWidth: "none",
        }}
        ref={ref}
      >
        {items.map((item) => (
          <CarouselItem item={item} key={item.id} />
        ))}
      </View>
      <CarouselNextPrev next={next} previous={prev} />
      <CarouselDots indexes={indexes} currentIndex={activeItemIndex} />
    </View>
  );
};
