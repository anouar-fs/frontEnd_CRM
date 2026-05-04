import { describe, expect, test } from 'vitest'   
import { screen } from '@testing-library/react';
import { renderWithRoute } from '../../../../test/route';
import { generatePath } from 'react-router-dom';
import { PATH_ROUTER } from '../../../configuration';
import { waitForAppToBeReady } from '../../../../test/utils/utils';

describe('dashboard',()=>{
    describe('show',()=>{
        
        test("should show analytics title and the description also",async ()=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Analytics)}`])
            await waitForAppToBeReady();
            //      show the cards  
            screen.getByRole('heading', { name: 'Key Performance Indicator Of Advisors' })
            screen.getByText(/This chart displays the evolution of appointment activity for each advisor over time./)
            screen.getByText(/For each advisor, the chart shows the number of appointments handled per month/)
            screen.getByText(/This allows you to analyze both the monthly workload distribution and the outcome of appointments across different statuses./)

            screen.getByRole('heading', { name: 'Appointments Analytics' })
        })

        test.each([[0,'John Doe'],[1,'Sara Smith'],[2,'Omar El Amrani'],[3,'Lina Bennani']])("should bind for index %s the advisor %s to the select element",async (index,name)=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Analytics)}`])
            await waitForAppToBeReady();

            const options = screen.getAllByRole('option')
            expect(options[index].textContent).toBe(name)
        })
    });
});