import { useParams } from 'react-router-dom';
import styles from './dyinamic-title.module.css';
import clsx from 'clsx';

type TModalWrapper = {
  children?: React.ReactNode;
};

export const DynamicTitle = ({ children }: TModalWrapper) => {
  const { number } = useParams();

  return (
    <>
      <h3 className={clsx(styles.title, 'text text_type_main-large')}>
        #{number}
      </h3>
      {children}
    </>
  );
};
