import { FC } from 'react';
import { ExpandCircleDownTwoTone } from '@mui/icons-material';
import { SnackbarAlert } from '../../../SnackbarAlert';
import { AdditionalItemModal } from './components/AdditionalItemModal';
import {
    FinanceApplicationContentContainer,
    NavigationContainer,
    StyledButton,
} from '../../styles/FinanceApp';
import { Icon } from '../../../Icon';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { BudgetItem } from './components/BudgetItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { isToday } from '../../../../utils/checkers/date';
import { useBudgetStore } from '../../../../stores/finance-app/budget/useBudgetStore';

export const FinanceCards: FC = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const { budget } = useBudgetStore(state => state);

    return (
        <FinanceApplicationContentContainer container spacing={2}>
            {budget.length > 0 ? (
                <>
                    {matches ? (
                        <>
                            <Swiper
                                slidesPerView={3}
                                navigation={{
                                    nextEl: '.swiper-custom-next',
                                    prevEl: '.swiper-custom-prev',
                                }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    1024: {
                                        slidesPerView: 2,
                                    },
                                    1025: {
                                        slidesPerView: 3,
                                    },
                                }}
                                initialSlide={budget.findIndex(item =>
                                    isToday(item.month, item.year)
                                )}
                                centeredSlides={true}
                                modules={[Pagination, Navigation]}
                            >
                                {budget.map((budgetItem, index) => (
                                    <SwiperSlide key={index}>
                                        <BudgetItem
                                            budgetItem={budgetItem}
                                            idx={index}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <NavigationContainer>
                                <StyledButton
                                    className="swiper-custom-prev"
                                    $left={true}
                                >
                                    <ExpandCircleDownTwoTone fontSize="large" />
                                </StyledButton>
                                <StyledButton
                                    className="swiper-custom-next"
                                    $right={true}
                                >
                                    <ExpandCircleDownTwoTone fontSize="large" />
                                </StyledButton>
                            </NavigationContainer>
                        </>
                    ) : (
                        <>
                            {budget.map((budgetItem, index) => (
                                <BudgetItem
                                    budgetItem={budgetItem}
                                    idx={index}
                                    key={index}
                                />
                            ))}
                        </>
                    )}
                </>
            ) : (
                <Typography variant="h5">
                    You have to configure your application. Click on Settings in
                    menu to do it. When you finished configure, then you can
                    generate your Budget by clicking on{' '}
                    <Icon icon={faCalendarDays} />{' '}
                </Typography>
            )}
            <AdditionalItemModal />
            <SnackbarAlert
                variant="outlined"
                severity="error"
                message="You changed the payment from the past. Please change 'Current' value as well!"
                hasAction
                type="changesDetection"
            />
        </FinanceApplicationContentContainer>
    );
};
