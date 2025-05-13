import { Fragment, ReactElement } from 'react';
import { ApplicationItem } from './components/ApplicationItem';
import { applications } from '../../data/applications.tsx';
import { ApplicationsContentContainer } from './styles/Applications.ts';

export const Applications = (): ReactElement => {
    return (
        <ApplicationsContentContainer container spacing={2}>
            {applications.map(application => (
                <Fragment key={application.id}>
                    <ApplicationItem application={application} />
                </Fragment>
            ))}
        </ApplicationsContentContainer>
    );
};
