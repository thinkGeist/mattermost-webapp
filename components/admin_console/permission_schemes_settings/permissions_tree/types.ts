// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ClientConfig, ClientLicense} from 'mattermost-redux/types/config.js';

export type Permission = {
    id: string;
    combined?: boolean;
    permissions: string[];
}
export type Group = {
    id: string;
    permissions: Array<Permission | string>;
    isVisible?: (license: (Partial<ClientLicense> | undefined), config: Partial<ClientConfig>, scope: string) => boolean;
}

export type AdditionalValues = {
    edit_post: {
        editTimeLimitButton: JSX.Element;
    };
}
