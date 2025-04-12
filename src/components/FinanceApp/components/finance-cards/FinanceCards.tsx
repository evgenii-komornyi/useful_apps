import { FC } from 'react';
import {
    FinanceApplicationContentContainer,
    NavigationContainer,
    StyledButton,
} from '../../styles/FinanceApp.ts';
import { useBudgetStore } from '../../../../stores/finance-app/budget/useBudgetStore.ts';
import { BudgetItem } from './components/BudgetItem';
import { AdditionalItemModal } from './components/AdditionalItemModal';
import { Typography } from '@mui/material';
import { Icon } from '../../../Icon/Icon.tsx';
import { faCalendarDays, faGear } from '@fortawesome/free-solid-svg-icons';
import { SnackbarAlert } from '../../../SnackbarAlert/SnackbarAlert.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { isToday } from '../../../../utils/checkers/date.ts';
import { ExpandCircleDownTwoTone } from '@mui/icons-material';

export const FinanceCards: FC = () => {
    const { budget } = useBudgetStore(state => state);

    return (
        <FinanceApplicationContentContainer container spacing={2}>
            <Swiper
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-custom-next',
                    prevEl: '.swiper-custom-prev',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
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
                {budget.length > 0 ? (
                    budget.map((budgetItem, index) => (
                        <SwiperSlide key={index}>
                            <BudgetItem budgetItem={budgetItem} idx={index} />
                        </SwiperSlide>
                    ))
                ) : (
                    <Typography variant="h5">
                        You have to configure your application. Click on{' '}
                        <Icon icon={faGear} /> icon to do it. When you finished
                        configure, then you can generate your Budget by clicking
                        on <Icon icon={faCalendarDays} />{' '}
                    </Typography>
                )}
            </Swiper>
            <NavigationContainer>
                <StyledButton className="swiper-custom-prev" $left={true}>
                    <ExpandCircleDownTwoTone fontSize="large" />
                </StyledButton>
                <StyledButton className="swiper-custom-next" $right={true}>
                    <ExpandCircleDownTwoTone fontSize="large" />
                </StyledButton>
            </NavigationContainer>

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
