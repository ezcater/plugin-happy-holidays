import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import React, { Component } from 'react';
import createSnowflakeClient from 'utilities/createSnowflakeClient';
import { styled } from '@twilio/flex-ui';

interface State {
  isActive: boolean;
  snowflakeClient: any;
}

interface Props {}

const StyledToggle = styled(Toggle)`
  display: flex;

  .react-toggle-track {
    background: #ebf7ff !important;
  }

  .react-toggle-thumb {
    border-color: #77b1e2 !important;
    outline: none;
    box-shadow: none !important;
  }

  .react-toggle-track-check,
  .react-toggle-track-x {
    line-height: 10px !important;
  }
`;

const StyledContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const StyledText = styled('p')`
  margin-left: 1rem;
`;

export default class HappyHolidaysToggle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isActive: false,
      snowflakeClient: createSnowflakeClient()
    };
  }

  handleChange(event: any) {
    if (event.target.checked) {
      this.setState({ isActive: true });
      this.state.snowflakeClient.initialize();
    } else {
      this.state.snowflakeClient.destroy();
      this.setState({
        snowflakeClient: createSnowflakeClient(),
        isActive: false
      });
    }
  }

  render() {
    const { isActive } = this.state;

    return (
      <StyledContainer>
        <StyledToggle
          onChange={this.handleChange}
          icons={{
            unchecked: (
              <span role="img" aria-label="on">
                ☃️
              </span>
            ),
            checked: (
              <span role="img" aria-label="off">
                ❌
              </span>
            )
          }}
        />
        {isActive && (
          <StyledText>
            <span role="img" aria-label="snowman">
              ☃️
            </span>
            Happy Holidays from the #ninja-enablement team!
          </StyledText>
        )}
      </StyledContainer>
    );
  }
}
