import { FC, ReactNode, Fragment } from 'react';

type LocaleProps = {
  children: ReactNode;
};

const SplitBr: FC<LocaleProps> = ({ children }) => {
  if (typeof children === 'string') {
    const arr = children.split(/<br>|<br\/>|<br \/>/);

    return (
      <>
        {arr.map((item, index) => {
          const isLast = index === arr.length - 1;

          return (
            <Fragment key={index}>
              {item}
              {isLast ? null : <br />}
            </Fragment>
          );
        })}
      </>
    );
  }

  return <>{children}</>;
};

export default SplitBr;
