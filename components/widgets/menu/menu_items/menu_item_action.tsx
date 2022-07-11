// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import classNames from 'classnames';

import OverlayTrigger from 'components/overlay_trigger';
import Tooltip from 'components/tooltip';

import Constants from 'utils/constants';

import menuItem from './menu_item';

type Props = {
    onClick: (e: React.MouseEvent) => void;
    ariaLabel?: string;
    text: React.ReactNode;
    extraText?: string;
    id?: string;
    buttonClass?: string;
    rightDecorator?: React.ReactNode;
    isDangerous?: boolean;
    disabled?: boolean;
    disabledText?: string;
}

export const MenuItemActionImpl = ({
    onClick,
    ariaLabel,
    text,
    extraText,
    id,
    buttonClass,
    rightDecorator,
    isDangerous,
    disabled,
    disabledText,
}: Props) => {
    const disabledTooltip = (
        <Tooltip id='disabled-tooltip'>
            {disabledText}
        </Tooltip>
    );
    return (
        <OverlayTrigger
            disabled={!disabled}
            placement='left'
            delayShow={Constants.OVERLAY_TIME_DELAY}
            trigger={Constants.OVERLAY_DEFAULT_TRIGGER}
            overlay={disabledTooltip}
        >
            <button
                data-testid={id}
                id={id}
                aria-label={ariaLabel}
                className={classNames('style--none', buttonClass, {
                    'MenuItem__with-help': extraText,
                    MenuItem__dangerous: isDangerous,
                    disabled,
                })}
                onClick={onClick}
                disabled={disabled}
            >
                {text && <span className='MenuItem__primary-text'>{text}{rightDecorator}</span>}
                {extraText && <span className='MenuItem__help-text'>{extraText}</span>}
            </button>
        </OverlayTrigger>
    );
};

const MenuItemAction = menuItem(MenuItemActionImpl);
MenuItemAction.displayName = 'MenuItemAction';

export default MenuItemAction;
