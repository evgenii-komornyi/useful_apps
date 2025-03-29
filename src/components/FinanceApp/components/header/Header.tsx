import { FC } from 'react';
import { SettingsButton } from './components/settings';
import { CurrentDateTime } from './components/current-date-time';
import { ControlContainer, HeaderContainer } from './styles/Header';
import { GenerationMenu } from './components/generation-menu';
import { Toolbar } from '../finance-cards/components/BudgetItem/components/Expenses/components/Toolbar';

export const Header: FC = () => {
    return (
        <HeaderContainer>
            <CurrentDateTime />
            <Toolbar />
            <ControlContainer>
                <GenerationMenu />
                <SettingsButton />
            </ControlContainer>
        </HeaderContainer>
    );
};
