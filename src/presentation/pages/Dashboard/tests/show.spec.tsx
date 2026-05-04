import { describe, test } from 'vitest'   
import { screen } from '@testing-library/react';
import { renderWithRoute } from '../../../../test/route';
import { generatePath } from 'react-router-dom';
import { PATH_ROUTER } from '../../../configuration';
import { waitForAppToBeReady } from '../../../../test/utils/utils';

describe('dashboard',()=>{
    describe('show',()=>{
        test("should show the dashboard header",async ()=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Dashboard)}`])
            await waitForAppToBeReady();
            
            //      pagae title 
            screen.getByRole('heading', { name: 'Dashboard' })
            screen.getByText("Welcome back — here's what's happening today.")
        })
        
        test("should show the cards of the dashboard",async ()=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Dashboard)}`])
            await waitForAppToBeReady();
            //      show the cards  
            screen.getByRole('heading', { name: 'Monthly Appointements' })
            screen.getByText("14")
            screen.getByRole('heading', { name: 'Monthly Leads' })
            screen.getByText("16")
            screen.getByRole('heading', { name: 'Monthly Advisors' })
            screen.getByText("9")
        })
        
        
        test("should show Yearly stats chart",async ()=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Dashboard)}`])
            await waitForAppToBeReady();
            //      show the cards  
            screen.getByRole('heading', { name: 'Yearly appointements stats' })
            screen.getByRole('heading', { name: 'Yearly leads stats' })
        })
    });
});