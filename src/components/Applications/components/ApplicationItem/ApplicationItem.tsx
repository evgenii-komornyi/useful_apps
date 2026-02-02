import { ReactElement } from 'react';
import Grid from '@mui/material/Grid2';
import {
    AnimatedIconContainer,
    ApplicationBoxContainer,
    ApplicationTitle,
} from './styles/ApplicationItem.ts';
import { IApplication } from '../../../../utils/common.ts';
import { NavLink } from '../../../../styles/Global.ts';

interface IProps {
    application: IApplication;
}

export const ApplicationItem = ({ application }: IProps): ReactElement => {
    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <NavLink to={`/${application.link}`}>
                <ApplicationBoxContainer>
                    <AnimatedIconContainer>
                        {application.icon}
                    </AnimatedIconContainer>
                    <ApplicationTitle>{application.title}</ApplicationTitle>
                </ApplicationBoxContainer>
            </NavLink>
        </Grid>
    );
};
