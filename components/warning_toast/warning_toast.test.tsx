// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {shallow} from 'enzyme';

import {WarningToast} from './warning_toast';

describe('components/WarningToast', () => {
    test('should match snapshot', () => {
        const wrapper = shallow(
            <WarningToast
                onDismiss={jest.fn()}
            >{'A hint'}</WarningToast>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should fire onDismiss callback', () => {
        const dismissHandler = jest.fn();
        const wrapper = shallow(
            <WarningToast
                onDismiss={dismissHandler}
            >{'A hint'}</WarningToast>,
        );

        wrapper.find('.warning-toast__dismiss').simulate('click');

        expect(dismissHandler).toHaveBeenCalled();
    });

    test('should automatically dismiss after 5 seconds', () => {
        jest.useFakeTimers();
        const dismissHandler = jest.fn();
        shallow(
            <WarningToast
                onDismiss={dismissHandler}
            >{'A hint'}
            </WarningToast>,
        );

        jest.advanceTimersByTime(6000);

        expect(dismissHandler).toHaveBeenCalled();
    });

    test('should automatically dismiss after X seconds', () => {
        jest.useFakeTimers();
        const dismissHandler = jest.fn();
        shallow(
            <WarningToast
                onDismiss={dismissHandler}
                dismissAfterSeconds={10}
            >{'A hint'}
            </WarningToast>,
        );

        jest.advanceTimersByTime(11000);

        expect(dismissHandler).toHaveBeenCalled();
    });
});
