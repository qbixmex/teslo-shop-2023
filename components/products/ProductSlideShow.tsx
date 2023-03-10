import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideShow.module.css';
import 'react-slideshow-image/dist/styles.css';

type Props = { images: string[] };

const transitionProps = {
  duration: 7000,
  indicators: true,
  easing: 'ease',
  transitionDuration: 500
};

export const ProductSlideShow = ({ images }: Props) => {
  return (
    <Slide { ...transitionProps }>
      { images.map(image => {
        return (
          <div className={styles['each-slide']} key={image}>
            <div style={{
              backgroundImage: `url(${ image })`,
              backgroundSize: 'cover'
            }}>
            </div>
          </div>
        );
      })}
    </Slide>
  );
};
