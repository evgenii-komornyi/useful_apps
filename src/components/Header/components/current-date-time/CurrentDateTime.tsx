import {ReactElement, useEffect, useState} from "react";
import {BlinkingColon, DateSegment, Segment, TimeContainer} from "./styles/CurrentDateTime.ts";
import {useFinanceSettingsStore} from "../../../../stores/finance-app/settings/useSettingsStore.ts";

export const CurrentDateTime = (): ReactElement => {
    const locale = useFinanceSettingsStore(state => state.user.locale);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showColon, setShowColon] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const colonBlinker = setInterval(() => {
            setShowColon((prev) => !prev);
        }, 1000);
        return () => clearInterval(colonBlinker);
    }, []);

    const formattedDate = new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
    }).format(currentTime);

    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');

    return (
        <TimeContainer>
            <DateSegment $month={currentTime.getMonth()}>{formattedDate}</DateSegment>
            <Segment>{hours}</Segment>
            <BlinkingColon $show={showColon}>:</BlinkingColon>
            <Segment>{minutes}</Segment>
        </TimeContainer>
    )
}