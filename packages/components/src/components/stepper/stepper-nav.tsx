import cn from 'classnames';
import React from 'react';

import { useLayout } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import styles from './stepper.module.scss';
import { StepperContext } from './stepper-context';

export interface StepperNavItem {
  label: string;
  completed: boolean;
  index: number;
  /**
   * ID of tab
   */
  id: string;
}

export interface StepperNavProps {
  /**
   * Navigation items
   */
  items: StepperNavItem[];
  /**
   * Navigation aria-label
   */
  ariaLabel: string;
  /**
   * Completed label, added only for screen-readers.
   * Defaults to "Completed".
   */
  completedLabel?: string;
  /**
   * Not Completed label, added only for screen-readers.
   * Defaults to "Not completed".
   */
  notCompletedLabel?: string;
}

export const StepperNav = (props: StepperNavProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    items,
    ariaLabel,
    completedLabel = getLabel('stepper.completed'),
    notCompletedLabel = getLabel('stepper.not-completed'),
  } = props;
  const isMobileLayout = useLayout(['mobile']);
  const isTabletLayout = useLayout(['tablet']);
  const isDesktopLayout = useLayout(['desktop']);

  const { activeStep, onActiveStepChange } = React.useContext(StepperContext);

  const StepperNavItem = ({ label, completed, index, id }: StepperNavItem): JSX.Element => {
    const isCurrent = index === activeStep;
    const StepperNavItemBEM = cn(
      styles['stepper__nav-item'],
      { [styles['stepper__nav-item--current']]: isCurrent },
      { [styles['stepper__nav-item--completed']]: completed },
      { [styles['stepper__nav-item--tablet']]: isTabletLayout },
      { [styles['stepper__nav-item--desktop']]: isDesktopLayout }
    );

    const StepperNavItemLabelBEM = cn(styles['stepper__nav-item-label'], {
      'visually-hidden': isMobileLayout && !isCurrent,
    });

    return (
      <li className={StepperNavItemBEM}>
        <button
          type="button"
          role="tab"
          aria-selected={isCurrent}
          aria-controls={id}
          className={styles['stepper__nav-item-inner']}
          onClick={() => onActiveStepChange(index)}
        >
          <span className={styles['stepper__nav-item-counter']}>{index + 1}</span>
          <span className={StepperNavItemLabelBEM}>{label}</span>
          {completed && <span className="visually-hidden">{completedLabel}</span>}
          {completed && !isCurrent && <span className="visually-hidden">{notCompletedLabel}</span>}
        </button>
        {isCurrent && <span className={styles['stepper__nav-item-arrow']} />}
      </li>
    );
  };

  return (
    <nav role="tablist" aria-label={ariaLabel}>
      <ol className={styles['stepper__nav']}>
        {items.map((item, key) => (
          <StepperNavItem key={key} {...item} />
        ))}
      </ol>
    </nav>
  );
};

export default StepperNav;
