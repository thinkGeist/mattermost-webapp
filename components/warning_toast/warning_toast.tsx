// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';

import {CloseIcon, AlertOutlineIcon} from '@mattermost/compass-icons/components';

import './warning_toast.scss';

type Props = {
    children: React.ReactNode;
    dismissAfterSeconds?: number;
    onDismiss: () => void;
}

export const WarningToast: React.FC<Props> = ({children, onDismiss, dismissAfterSeconds = 5}: Props) => {
    const handleDismiss = () => {
        if (typeof onDismiss === 'function') {
            onDismiss();
        }
    };

    setTimeout(() => {
        handleDismiss();
    }, 1000 * dismissAfterSeconds);

    return (
        <div className='warning-toast__wrapper'>
            <div className='warning-toast'>
                <div
                    className='warning-toast__message'
                >
                    <AlertOutlineIcon
                        size={18}
                    />
                    {children}
                </div>
                <div
                    className='warning-toast__dismiss'
                    onClick={handleDismiss}
                    data-testid='dismissWarningToast'
                >
                    <CloseIcon
                        size={18}
                    />
                </div>
            </div>
        </div>
    );
};
