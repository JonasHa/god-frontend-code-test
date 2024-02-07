import NextLink from "next/link";
import { Link, Spacer, Text, View, useTheme } from "vcc-ui";
import { Car } from "../hooks/useCars";
import styles from "./CarouselItem.module.css";

type Props = {
  item: Car;
};

export const CarouselItem = ({ item }: Props) => {
  const { color } = useTheme();
  const { id, modelName, modelType, bodyType, imageUrl } = item;
  const learn = `/learn/${id}`;
  const shop = `/shop/${id}`;

  return (
    <View
      direction="column"
      justifyContent="center"
      role="listitem"
      className={styles.carouselItem}
    >
      <Text
        subStyle="emphasis"
        variant="bates"
        extend={{
          color: color.foreground.secondary,
        }}
      >
        {bodyType.toUpperCase()}
      </Text>
      <View
        extend={{
          fromL: {
            flexDirection: "row",
          },
        }}
      >
        <Text
          subStyle="emphasis"
          extend={{
            marginRight: "5px",
          }}
        >
          {modelName}
        </Text>
        <Text
          extend={{
            color: color.foreground.secondary,
          }}
        >
          {modelType}
        </Text>
      </View>

      <picture>
        <img
          className={styles.carouselItemImage}
          src={item.imageUrl}
          alt={item.modelName}
        />
      </picture>
      <View direction="row" justifyContent="center">
        <NextLink href={learn} passHref>
          <Link
            tabIndex={-1}
            arrow="right"
            aria-label={`Learn about ${modelName} ${modelType}`}
          >
            {"Learn".toUpperCase()}
          </Link>
        </NextLink>
        <Spacer size={2} />
        <NextLink href={shop} passHref>
          <Link
            tabIndex={-1}
            arrow="right"
            aria-label={`Shop ${modelName} ${modelType}`}
          >
            {"Shop".toUpperCase()}
          </Link>
        </NextLink>
      </View>
    </View>
  );
};
