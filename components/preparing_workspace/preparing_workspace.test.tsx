// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import * as redux from 'react-redux';
import * as reactIntl from 'react-intl';

import {render} from '@testing-library/react';

import {UserProfile} from 'mattermost-redux/types/users';
import {Team} from 'mattermost-redux/types/teams';
import {ClientConfig} from 'mattermost-redux/types/config';

import {withIntl} from 'tests/helpers/intl-test-helper';
import configureStore from 'redux-mock-store';

import PreparingWorkspace from './preparing_workspace';

interface MockReduxOptions {
    currentUser?: UserProfile;
    isFirstAdmin?: boolean;
    useCaseOnboarding?: boolean;
    isSelfHosted?: boolean;
    currentTeam?: Team;
    myTeams?: Team[];
    config?: Partial<ClientConfig>;
    firstAdminSetupComplete?: boolean;
}

function mockRedux(options: MockReduxOptions) {
    const state = {
        entities: {
            users: {
                currentUserId: 'currentuserid',
                profiles: {
                    currentuserid: options.currentUser || {} as UserProfile,
                },
            },
            teams: {
                currentTeamId: options.currentTeam ? 'currentteamid' : '',
                teams: {
                    currentteamid: options.currentTeam,
                }
            },
            general: {
                config: {
                    FeatureFlagUseCaseOnboarding: options.useCaseOnboarding,
                },
            },
        },
    };

    const useSelectorSpy = jest.spyOn(redux, 'useSelector')
    useSelectorSpy.mockImplementationOnce(() => options.currentUser || {
        roles: '',
        create_at: 0,
    } as UserProfile)
    useSelectorSpy.mockImplementationOnce(() => options.isFirstAdmin ?? true)
    useSelectorSpy.mockImplementationOnce(() => options.useCaseOnboarding ?? true)
    useSelectorSpy.mockImplementationOnce(() => options.isSelfHosted ?? true)
    useSelectorSpy.mockImplementationOnce(() => options.currentTeam)
    useSelectorSpy.mockImplementationOnce(() => options.myTeams || [] as Team[])
    useSelectorSpy.mockImplementationOnce(() => options.config || {} as Partial<ClientConfig>)

    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn())
    const mockStore = configureStore();
    const store = mockStore(state)
    return store;
    // return [useSelectorSpy, useDispatchSpy]
}


describe('PreparingWorkspace', () => {
    beforeEach(() => {
        jest.spyOn(reactIntl, 'useIntl').mockReturnValue({
            ...jest.requireActual('react-intl'),
            formatMessage: (x) => x?.defaultMessage?.toString() || '',
        })
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('self hosted shows organization page when team does not exist', () => {
        const store = mockRedux({});
        const props = {
            history: {
                push: jest.fn(),
            },
            handleForm: jest.fn(),
            actions: {
                getProfiles: jest.fn(),
                createTeam: jest.fn(),
            },
        };
        const {getByText} = render(
            <redux.Provider store={store}>
                {withIntl(<PreparingWorkspace {...props} />)}
            </redux.Provider>
        );
        getByText('What’s the name of your organization?')
    });

    // it('self hosted shows url page when team already exists', () => {
    //     mockRedux({
    //         currentTeam: {
    //             id: '',
    //             create_at: 0,
    //             update_at: 0,
    //             delete_at: 0,
    //             display_name: '',
    //             name: '',
    //             description: '',
    //             email: '',
    //             type: 'O',
    //             company_name: '',
    //             allowed_domains: '',
    //             invite_id: '',
    //             allow_open_invite: true,
    //             scheme_id: '',
    //             group_constrained: false,
    //         },
    //     });
    //     const props = {
    //         history: {
    //             push: jest.fn(),
    //         },
    //         handleForm: jest.fn(),
    //         actions: {
    //             getProfiles: jest.fn(),
    //             createTeam: jest.fn(),
    //         },
    //     };
    //     const {getByText} = renderWithIntl(<PreparingWorkspace {...props} />)
    //     getByText('Confirm your server’s URL')
    // });
});
