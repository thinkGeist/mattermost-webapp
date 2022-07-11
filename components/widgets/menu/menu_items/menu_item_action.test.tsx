// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import {MenuItemActionImpl} from './menu_item_action';

describe('components/MenuItemAction', () => {
    test('should match snapshot', () => {
        const wrapper = shallow(
            <MenuItemActionImpl
                onClick={jest.fn()}
                text='Whatever'
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });
    test('should match snapshot with extra text', () => {
        const wrapper = shallow(
            <MenuItemActionImpl
                onClick={jest.fn()}
                text='Whatever'
                extraText='Extra Text'
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
