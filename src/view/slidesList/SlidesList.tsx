import { SlideType } from "../../types/Slide.ts";
import { SelectionType } from "../../types/Selection.ts";
import styles from "./SlidesList.module.css";
import { useAppContext } from "../../contexts/appContext/AppContextProvider.tsx";
import useSlideClick from "../../hooks/useSlideClick.ts";
import { SlidePreview } from "../../components/slidePreview/slidePreview.tsx";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListPros = {
  slides: Array<SlideType>;
  selection: SelectionType;
};

const SlidesList = ({ slides, selection }: SlidesListPros) => {
  const onSlideClick = useSlideClick(slides, selection);
  const { setCurrentElement } = useAppContext();

  return (
    <div className={styles.slideList}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={styles.item__wrapper}
          onClick={(event) => {
            onSlideClick(slide.id, selection, event);
            setCurrentElement(null);
          }}
        >
          <span className={styles.item__number}>{index + 1}</span>
          <SlidePreview
            scale={SLIDE_PREVIEW_SCALE}
            isSelected={selection.selectedSlidesId!.includes(slide.id)}
            slide={slide}
          />
        </div>
      ))}
    </div>
  );
};

export { SlidesList };
