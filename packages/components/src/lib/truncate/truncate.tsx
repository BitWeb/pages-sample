import React from 'react';

import { Button, ButtonProps } from '../button/button';
import { useFirstRender } from '../helper/hooks/use-first-render';
import { useLabels } from '../label-provider';

export interface TruncateProps {
  /**
   * Text that will be truncated
   */
  children: string;
  /**
   * Max length of text, when truncated. Defaults to 200.
   */
  maxLength?: number;
  /**
   * Callback when see more button is clicked
   */
  onOpen?: () => void;
  /**
   * Callback when see less button is clicked
   */
  onClose?: () => void;
  /**
   * To override default button properties
   */
  button?: Partial<ButtonProps>;
}

export const Truncate = (props: TruncateProps): JSX.Element => {
  const { children, maxLength = 200, onClose, onOpen, button } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const firstRender = useFirstRender();
  const { getLabel } = useLabels();

  const getText = (): string =>
    children.length >= maxLength && !isOpen ? `${children.substring(0, maxLength)}...` : children;

  React.useEffect(() => {
    if (firstRender) {
      return;
    }

    isOpen ? onOpen?.() : onClose?.();
  }, [firstRender, isOpen, onClose, onOpen]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>): void => {
    setIsOpen((isOpenLast) => !isOpenLast);
    button?.onClick?.(event);
  };

  return (
    <span>
      {getText()}{' '}
      {children.length >= maxLength && (
        <Button
          text={isOpen ? getLabel('truncate.see-less') : getLabel('truncate.see-more')}
          type="link"
          {...button}
          onClick={handleOnClick}
        />
      )}
    </span>
  );
};

export default Truncate;
