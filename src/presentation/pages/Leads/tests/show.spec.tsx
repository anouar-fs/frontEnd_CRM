import { describe, test } from 'vitest'   
import { screen } from '@testing-library/react';
import { renderWithRoute } from '../../../../test/route';
import { generatePath } from 'react-router-dom';
import { PATH_ROUTER } from '../../../configuration';
import { waitForAppToBeReady } from '../../../../test/utils/utils';

describe('leads',()=>{
    describe('show',()=>{
        test("should show the leads data",async ()=>{
        renderWithRoute([`${generatePath(PATH_ROUTER.Leads)}`])
        await waitForAppToBeReady();
        
        //      pagae title 
        screen.getByRole('heading', { name: 'Leads' })
        // ---------- LEAD 1 ----------
        screen.getByText('John Doe')
        screen.getByText('john.doe@email.com')
        screen.getByText('spring-sale')
        screen.getByText('Facebook Ads')
        screen.getByText('10 Apr 2026, 15:21')

        // ---------- LEAD 2 ----------
        screen.getByText('Sara Smith')
        screen.getByText('sara.smith@email.com')
        screen.getByText('summer-launch')
        screen.getByText('Google Ads')
        screen.getByText('09 Apr 2026, 09:50')
        })
    });
});