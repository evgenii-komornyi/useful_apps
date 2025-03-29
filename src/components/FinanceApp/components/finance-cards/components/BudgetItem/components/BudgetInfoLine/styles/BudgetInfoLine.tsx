import styled from 'styled-components';
import { Check } from '@mui/icons-material';
import { MainBoxContainer } from '../../../../../../../../../styles/Global';

export const BoxContainer = styled(MainBoxContainer)`
    width: 340px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const CheckIcon = styled(Check)<{ $isPaymentDay: boolean }>`
    && {
        opacity: ${({ $isPaymentDay }) => ($isPaymentDay ? 1 : 0)};
    }
`;
