import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import HappyHolidaysToggle from 'components/Toggle';

const PLUGIN_NAME = 'HappyHolidaysPlugin';

export default class HappyHolidaysPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    flex.MainHeader.Content.add(<HappyHolidaysToggle key="happy-holidays" />);
  }
}
