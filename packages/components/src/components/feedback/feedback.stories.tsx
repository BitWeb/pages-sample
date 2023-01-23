import { ArgsTable, CURRENT_SELECTION, Description, Primary, Stories, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { CardContent, CardHeader } from '../card';
import TextArea from '../form/textarea/textarea';
import TextField from '../form/textfield/textfield';
import { Col, Row } from '../grid';
import Heading from '../heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import Feedback, { FeedbackProps } from './feedback';

export default {
  title: 'components/Feedback',
  component: Feedback,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            Feedback component contains everything to render a modal, including the trigger button. It adds some default
            props to the trigger and modal and renders the button on the right side for desktop and inline for mobile.
            Feedback component should be rendered after the main content to have the correct focus order.
          </Description>
          <Primary />
          <ArgsTable story={CURRENT_SELECTION} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<FeedbackProps> = (args) => {
  return (
    <VerticalSpacing>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias asperiores aspernatur blanditiis
        cupiditate ea eum explicabo fugiat, id ipsam laudantium molestiae nemo, quae sed similique ut velit veniam,
        voluptas?
      </p>
      <Feedback {...args}>
        <CardHeader style="white">
          <Heading className="h4">Feedback</Heading>
        </CardHeader>
        <CardContent>
          <VerticalSpacing>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequatur culpa, deleniti fugit id
              labore perspiciatis quaerat quas quibusdam recusandae? Aperiam cupiditate doloremque facilis molestiae
              molestias nihil tempore temporibus voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto consequatur culpa, deleniti fugit id labore perspiciatis quaerat quas quibusdam recusandae?
            </p>
            <TextField
              id="subject"
              label="Subject"
              helper={{
                text: '0/200',
              }}
            />
            <TextArea
              id="content"
              label="Content"
              helper={{
                text: '0/4000',
              }}
            />
            <Row justifyContent="end">
              <Col width="auto">
                <Button>Send feedback</Button>
              </Col>
            </Row>
          </VerticalSpacing>
        </CardContent>
      </Feedback>
    </VerticalSpacing>
  );
};

export const Default = Template.bind({});
Default.args = {
  triggerProps: {
    children: 'Feedback',
  },
};