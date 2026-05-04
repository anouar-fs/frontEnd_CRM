import { beforeEach, describe, test } from 'vitest'   
import { screen } from '@testing-library/react';
import { renderWithRoute } from '../../../../test/route';
import { generatePath } from 'react-router-dom';
import { PATH_ROUTER } from '../../../configuration';
import { waitForAppToBeReady } from '../../../../test/utils/utils';
import { server } from '../../../../test/mocks/server';
import type { AppointmentType } from '../../../../models/appointment';
import { http, HttpResponse } from 'msw';
import { api } from '../../../../infrastructure/queries/config';

describe('dashboard',()=>{
    describe('show',()=>{
        beforeEach(()=>{
            server.use(
                http.get(baseUrl+api.get.event(getCurrentDAte()), ()=>{
                        return new HttpResponse(JSON.stringify(
                                    [
                                            {
                                            "id": 10,
                                            "advisor": {
                                                "id": 4,
                                                "firstname": "adam",
                                                "lastname": "asagh",
                                                "email": "adam.asagh@gmail.com",
                                                "phoneNumber": "+212612453327",
                                                "role": 1
                                            },
                                            "lead": {
                                                "id": 33,
                                                "firstName": "Leo",
                                                "lastName": "toti",
                                                "email": "imane.bouzid@gmail.com",
                                                "phone": "+212667890123",
                                                "source": "Google Ads",
                                                "receivedAt": "2026-01-06T10:45:55.555",
                                                "utmCampaign": "mobile_launch",
                                                "welcome_email_sent": false,
                                                "whatsappAnswer": true
                                            },
                                            "date": "2026-04-07",
                                            "heureDebut": "11:00",
                                            "statut": 1,
                                            "createdAt": "2026-03-16T11:29:32.005"
                                        },
                                        {
                                            "id": 9,
                                            "advisor": {
                                                "id": 3,
                                                "firstname": "anouar",
                                                "lastname": "asagh",
                                                "email": "anouar.asagh@gmail.com",
                                                "phoneNumber": "+212636259656",
                                                "role": 1
                                            },
                                            "lead": {
                                                "id": 33,
                                                "firstName": "Luis",
                                                "lastName": "diaz",
                                                "email": "imane.bouzid@gmail.com",
                                                "phone": "+212667890123",
                                                "source": "Google Ads",
                                                "receivedAt": "2026-01-06T10:45:55.555",
                                                "productInterest": "Mobile App",
                                                "utmCampaign": "mobile_launch",
                                                "welcome_email_sent": false,
                                                "whatsappAnswer": true
                                            },
                                            "date": "2026-04-07",
                                            "heureDebut": "10:00",
                                            "statut": 0,
                                            "createdAt": "2026-03-16T11:21:01.234"
                                        }
                                    ] as AppointmentType[]));
                    }),
            )
        })
        const baseUrl = 'http://localhost:7047';
        const getCurrentDAte = ()=>{
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`
            }
        function formatNiceDate(dateStr: string, locale: string) {
            const date = new Date(`${dateStr}T00:00:00`);
            return new Intl.DateTimeFormat(locale, {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
            }).format(date);
            }
        test("should show Planning Header components",async ()=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Appointment)}`])
            await waitForAppToBeReady();
            //      show the title 
            screen.getByText('Planning');
            screen.getByText(/View by time slot/);
            screen.getByText(formatNiceDate(getCurrentDAte(),'en-US'));
            screen.getByText('Total')
            screen.getByText('Busy')
            screen.getByText('time slots')
            screen.getByText('Advisors')
            screen.getAllByText('2')
            screen.getByRole('heading', { name: 'Schedule of the day' })
        })

        test.each([['11:00','Leo toti','adam asagh','Confirmed','10'],['10:00','Luis diaz','anouar asagh','Pending','9']])("should show appointements in the board body with time slot %s and lead name %s,status %s and id of appointement %s",
            async (timeSlot,leadName,advisorName,status,appId)=>{
            renderWithRoute([`${generatePath(PATH_ROUTER.Appointment)}`])
            await waitForAppToBeReady();

            screen.getAllByText(timeSlot)
            screen.getAllByText(advisorName)
            screen.getAllByText('Lead : '+leadName)
            screen.getAllByText(status)
            screen.getAllByText('#'+appId)
        })
    });
});