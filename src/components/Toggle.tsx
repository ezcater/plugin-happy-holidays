import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import React, { Component } from 'react';
import createSnowflakeClient from 'utilities/createSnowflakeClient';
import { styled } from '@twilio/flex-ui';

interface State {
  isActive: boolean;
}

interface Props {}

const StyledToggle = styled('div')`
  .switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 25px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(225, 235, 245);
    border: 1px solid rgb(26, 118, 210);
    transition: 0.4s;
  }

  .slider::before {
    z-index: 10;
    position: absolute;
    content: '';
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    background-color: #fff;
    border: 1px solid rgb(26, 118, 210);
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: rgb(225, 235, 245);
  }

  input:focus + .slider {
    box-shadow: 0 0 2px #2eb9f9;
  }
  input:checked + .slider::before {
    transform: translateX(18px);
  }
  .slider.round {
    border-radius: 34px;

    .Twilio-Icon-Content {
      margin: 0;
    }
  }
  .slider.round::before {
    border-radius: 50%;
  }
  .toggle {
    padding-right: 10px;
  }
  .flex-box {
    display: flex;
    align-items: center;
  }

  .icon-unchecked {
    position: absolute;
    right: 4px;
    user-select: none;
    z-index: 5;
  }

  .icon-checked {
    position: absolute;
    left: 4px;
    user-select: none;
    z-index: 5;
    top: 1px;
  }
`;

const StyledContainer = styled('div')`
  display: flex;
  align-items: center;
  width: 800px;
`;

const StyledText = styled('p')`
  margin-left: 8px;
  user-select: none;
`;

let snowflakeClient = createSnowflakeClient();

export default class HappyHolidaysToggle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isActive: false
    };
  }

  handleChange(event: any) {
    if (event.target.checked) {
      this.setState({ isActive: true });
      snowflakeClient = createSnowflakeClient();
      snowflakeClient.initialize();
    } else {
      snowflakeClient.destroy();
      this.setState({
        isActive: false
      });
    }
  }

  render() {
    const { isActive } = this.state;

    return (
      <StyledContainer>
        <StyledToggle>
          <div className="flex-box">
            <div className="toggle">
              <label className="switch" data-testid="go-offline-toggle">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={this.handleChange}
                />
                <span className="slider round">
                  {isActive && (
                    <span
                      role="img"
                      aria-label="unchecked"
                      className="icon-checked"
                    >
                      🚫
                    </span>
                  )}
                  {!isActive && (
                    <span
                      role="img"
                      aria-label="unchecked"
                      className="icon-unchecked"
                    >
                      ☃️
                    </span>
                  )}
                </span>
              </label>
            </div>
          </div>
        </StyledToggle>
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
