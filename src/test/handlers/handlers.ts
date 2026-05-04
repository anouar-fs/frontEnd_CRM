import { HttpResponse, http } from 'msw';
import { api } from '../../infrastructure/queries/config';
import { LeadBuilder } from '../builders/leadBuilder';
import { AdvisorBuilder } from '../builders/advisorBuilder';
import type { AppointmentStatsType } from '../../models/appointementStats';
import type { LeadsStatsType } from '../../models/LeadsStat';
import type { CardStats } from '../../models/CardStats';
import type { AppointmentAnalyticsType } from '../../models/appointementAnalytics';
import type { AdvisorType } from '../../helpers/TypesHelpers';

const baseUrl = 'http://localhost:7047';

export const handlers = [
    http.get(baseUrl+api.get.leads(), ()=>{
        return new HttpResponse(JSON.stringify(
            {
                    leads : [
                        new LeadBuilder()
                        .withId(1)
                        .withFirstname("John")
                        .withLastname("Doe")
                        .withEmail("john.doe@email.com")
                        .withPhone("0612345678")
                        .withSource("Facebook Ads")
                        .withReceivedAt("2026-04-10T15:21:11.123")
                        .withProductInterest("CRM")
                        .withUtmCampaign("spring-sale")
                        .withWelcomeEmailSent(true)
                        .withWhatsappAnswer(false)
                        .build(),

                        new LeadBuilder()
                        .withId(2)
                        .withFirstname("Sara")
                        .withLastname("Smith")
                        .withEmail("sara.smith@email.com")
                        .withPhone("0698765432")
                        .withSource("Google Ads")
                        .withReceivedAt("2026-04-09T09:50:55.9")
                        .withProductInterest("ERP")
                        .withUtmCampaign("summer-launch")
                        .withWelcomeEmailSent(false)
                        .withWhatsappAnswer(true)
                        .build()
                    ],
                    pageNumber: 1
                }
        ))
    }),
    http.get(baseUrl+api.get.ActivUser(), ()=>{
                        return new HttpResponse(JSON.stringify(new AdvisorBuilder()
                                                .withId(1)
                                                .withFirstname("John")
                                                .withLastname("Doe")
                                                .withEmail("john.doe@email.com")
                                                .withPhoneNumber("0612345678")
                                                .withRole(2)
                                                .build()))
                    }),
    http.get(baseUrl+api.get.appointementStats(), ()=>{
        return new HttpResponse(JSON.stringify([
                    {
                        "meetingStatus": 2,
                        "total": 11,
                        "percentage": 29.44
                    },
                    {
                        "meetingStatus": 1,
                        "total": 5,
                        "percentage": 11.11
                    },
                    {
                        "meetingStatus": 0,
                        "total": 20,
                        "percentage": 44.44
                    },
                    {
                        "meetingStatus": 3,
                        "total": 9,
                        "percentage": 20.0
                    }
                ] as AppointmentStatsType[]));
    }),
    http.get(baseUrl+api.get.leadsStats(), ()=>{
        return new HttpResponse(JSON.stringify(
                    {
                        "hotLeads":17,
                        "coldLeads":5
                    } as LeadsStatsType));
    }),
    http.get(baseUrl+api.get.cardStats(), ()=>{
        return new HttpResponse(JSON.stringify(
                    {
                        "monthlyAppointements":14,
                        "monthlyLeads":16,
                        "monthlyAdvisors":9
                    } as CardStats));
    }),
    http.get(baseUrl+api.get.advisors(), ()=>{
        return new HttpResponse(JSON.stringify(
            [
                {
                    id: 1,
                    firstname: "John",
                    lastname: "Doe",
                },
                {
                    id: 2,
                    firstname: "Sara",
                    lastname: "Smith",
                },
                {
                    id: 3,
                    firstname: "Omar",
                    lastname: "El Amrani",
                },
                {
                    id: 4,
                    firstname: "Lina",
                    lastname: "Bennani",
                },
            ]as AdvisorType[]));
    }),
    http.get(baseUrl+api.get.analyticssStats(), ()=>{
        return new HttpResponse(JSON.stringify(
                    {
                        Planned: [
                            { month: "Jan", total: 24.44 },
                            { month: "Feb", total: 18.2 },
                            { month: "Mar", total: 30.1 },
                        ],
                        Canceled: [
                            { month: "Jan", total: 5.5 },
                            { month: "Feb", total: 3.2 },
                            { month: "Mar", total: 6.0 },
                        ],
                        presented: [
                            { month: "Jan", total: 15.0 },
                            { month: "Feb", total: 12.3 },
                            { month: "Mar", total: 20.0 },
                        ],
                        absent: [
                            { month: "Jan", total: 4.0 },
                            { month: "Feb", total: 2.7 },
                            { month: "Mar", total: 4.1 },
                        ],
                    }as AppointmentAnalyticsType));
            }),

];
