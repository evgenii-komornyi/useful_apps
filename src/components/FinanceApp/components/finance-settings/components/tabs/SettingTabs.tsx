import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {ReactElement, SyntheticEvent, useState} from "react";
import {TabPanel} from "./components/TabPanel";
import {ProfitSettings} from "./components/TabPanel/components/profit-settings";
import {ExpensesSettings} from "./components/TabPanel/components/expenses-settings";
import {MainSettings} from "./components/TabPanel/components/main-settings";

const a11yProps = (index: number) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export const SettingTabs = (): ReactElement => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="profit and expenses tabs"
                >
                    <Tab label="Main" {...a11yProps(0)} />
                    <Tab label="Profit" {...a11yProps(1)} />
                    <Tab label="Expenses" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <MainSettings />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <ProfitSettings />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <ExpensesSettings />
            </TabPanel>
        </Box>
    );
}