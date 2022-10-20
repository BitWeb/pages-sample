import { ArgsTable, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { CardContent, CardHeader } from '../card';
import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import Modal, { ModalProps } from './modal';
import ModalCloser from './modal-closer';
import ModalProvider, { ModalProviderProps } from './modal-provider';
import ModalTrigger from './modal-trigger';

export default {
  title: 'components/Modal',
  component: ModalProvider,
  subcomponents: { ModalTrigger, Modal, ModalCloser },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            <p>
              Modal consist of 4 components: <b>ModalProvider</b>, <b>Modal</b>, <b>ModalTrigger</b> and{' '}
              <b>ModalCloser</b>
            </p>
          </Subtitle>
          <VerticalSpacing size={0.25} className="text-secondary">
            <p>ModalProvider - Provider context for other components. Handles modal open state.</p>
            <p>Modal - Visual UI component. Should always contain CardContent or CardHeader as children.</p>
            <p>ModalTrigger - Wrapper component around buttons/links to trigger modalOpen after click.</p>
            <p>ModalClose - Wrapper component around buttons/links to trigger modalClose after click.</p>
          </VerticalSpacing>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

interface TemplateProps extends ModalProps {
  heading?: string;
  content?: string;
  modalProvider?: Partial<ModalProviderProps>;
  renderHeader?: boolean;
  renderModalCloser?: boolean;
}

const Template: Story<TemplateProps> = (args: TemplateProps): JSX.Element => {
  const {
    heading = 'Heading',
    content = 'Default content',
    modalProvider,
    renderHeader = true,
    renderModalCloser = true,
    ...modal
  } = args;
  return (
    <ModalProvider {...modalProvider}>
      <ModalTrigger>
        <Button text="Ava Modal" />
      </ModalTrigger>
      <Modal {...modal} aria-labelledby="label">
        {renderHeader && (
          <CardHeader style="white">
            <h1 id="default-label">{heading}</h1>
          </CardHeader>
        )}
        <CardContent>
          {!renderHeader && <h1 id="default-label">{heading}</h1>}
          <p>{content}</p>
          {renderModalCloser && (
            <ModalCloser>
              <Button text="Sulge" onClick={() => console.log('Im called')} />
            </ModalCloser>
          )}
        </CardContent>
      </Modal>
    </ModalProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  heading: 'Modal width 6',
};

export const Width12 = Template.bind({});
Width12.args = {
  size: 12,
  heading: 'Modal width 12',
};

export const Width10 = Template.bind({});
Width10.args = {
  size: 10,
  heading: 'Modal width 10',
};

export const Width8 = Template.bind({});
Width8.args = {
  size: 8,
  heading: 'Modal width 8',
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  heading: 'Opened by default',
  modalProvider: {
    defaultOpen: true,
  },
};

export const ErrorTopModal = Template.bind({});
ErrorTopModal.args = {
  heading: 'Error type modal',
  content: 'Use to display error notifications',
  cardProps: { type: 'error-top' },
  renderHeader: false,
  renderModalCloser: false,
};

export const successTopModal = Template.bind({});
successTopModal.args = {
  heading: 'Success type modal',
  content: 'Use to display success notifications',
  cardProps: { type: 'success-top' },
  renderHeader: false,
  renderModalCloser: false,
};

export const warningTopModal = Template.bind({});
warningTopModal.args = {
  heading: 'Warning type modal',
  content: 'Use to display Warning notifications',
  cardProps: { type: 'warning-top' },
  renderHeader: false,
  renderModalCloser: false,
};

export const ControlledOutSide = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Row>
      <Col width="auto">
        <ModalProvider open={isOpen} onToggle={setIsOpen}>
          <ModalTrigger>
            <Button text="Open modal from trigger" />
          </ModalTrigger>
          <Modal aria-labelledby="controlled-outside">
            <CardContent>
              <p id="controlled-outside">Mind saab kontrollida väljaspoolt komponenti!</p>
            </CardContent>
            <Button text="close modal without ModalCloser" onClick={() => setIsOpen(false)} />
          </Modal>
        </ModalProvider>
      </Col>
      <Col width="auto">
        <Button text="Open modal from outside modal" onClick={() => setIsOpen(true)} />
      </Col>
    </Row>
  );
};
